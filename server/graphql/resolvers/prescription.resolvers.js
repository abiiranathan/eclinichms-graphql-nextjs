const { Item, Patient, Visit, Prescription } = require("../../models");

const include = [
  {
    model: Item,
    as: "drug",
  },
];

const resolvers = {
  Query: {
    prescriptions: async (_, { visitId }, { authenticate }) => {
      await authenticate();
      const where = visitId ? { visitId } : {};
      return await Prescription.findAll({ where, include });
    },
    prescription: async (_, { id }, { authenticate }) => {
      await authenticate();
      return await Prescription.findByPk(id, { include });
    },
    pharmacyPrescription: async (_, { id }, { authenticate }) => {
      await authenticate();

      const prescription = await Prescription.findByPk(id, {
        include: [...include, { model: Visit, as: "visit" }],
      });

      if (!prescription) throw new Error("Request not found!");

      const patient = await Patient.findByPk(prescription.visit.patientId);

      prescription.patient = patient;

      return prescription;
    },
    pharmacyPrescriptions: async (
      _,
      { visitId, name, page, pageSize, order: ordering },
      { authenticate }
    ) => {
      await authenticate();
      const where = visitId ? { visitId } : {};
      const query = { where };
      const order = ordering === "ASC" ? [["createdAt", "ASC"]] : [["createdAt", "DESC"]];
      const options = {};

      options.page = page;
      options.pageSize = pageSize;

      let modelIncludes = [
        ...include,
        { model: Visit, as: "visit", include: { as: "patient", model: Patient } },
      ];

      if (name) {
        modelIncludes = [
          ...include,
          {
            model: Visit,
            as: "visit",
            include: {
              as: "patient",
              model: Patient,
              where: {
                [Op.iLike]: `%${name}%`,
              },
            },
          },
        ];
      }

      const data = await Prescription.paginate(query, options, modelIncludes, order);
      return data;
    },
  },
  Mutation: {
    savePrescription: async (_, { visitId, prescriptions }, { user, authenticate }) => {
      await authenticate();

      if (prescriptions.length === 0) {
        throw new Error("Provide one or more prescriptions!");
      }

      const data = [];
      let errorOccured = false;

      for (const prescription of prescriptions) {
        const drug = await Item.findOne({
          id: prescription.drugId,
          type: "DRUG",
        });

        if (drug) {
          const p = await Prescription.create({
            visitId,
            doctor: user.name,
            ...prescription,
          });

          const populated = await Prescription.findByPk(p.id, { include });
          data.push(populated);
        } else {
          errorOccured = true;
          break;
        }
      }

      if (errorOccured) {
        for (const r of data) {
          await r.destroy();
        }
        throw new Error("One or more ID(s) of tests is invalid!");
      }

      return data;
    },
    updatePrescription: async (_, { prescriptionId, prescription }, { authenticate }) => {
      await authenticate();
      const presc = await Prescription.findByPk(prescriptionId);
      if (!presc) throw new Error("Prescription not found!");

      await presc.update(prescription);

      return await Prescription.findByPk(prescriptionId, { include });
    },
    updatePharmacyPrescription: async (_, { prescriptionId, issued }, { user, authenticate }) => {
      await authenticate();
      const presc = await Prescription.findByPk(prescriptionId);
      if (!presc) throw new Error("Prescription not found!");

      if (issued > presc.quantity) {
        throw new Error("Quantity issued exceeds prescribed amount!");
      }

      await presc.update({ issued, issuedBy: user.name });

      return await Prescription.findByPk(prescriptionId, { include });
    },
    stopPrescription: async (_, { prescriptionId }, { authenticate }) => {
      await authenticate();
      const presc = await Prescription.findByPk(prescriptionId);
      if (!presc) throw new Error("Prescription not found!");

      await presc.update({ stopped: true });
      return await Prescription.findByPk(prescriptionId, { include });
    },
    deletePrescription: async (_, { id }, { user, authenticate }) => {
      await authenticate();

      const prescription = await Prescription.findByPk(id);
      if (!prescription) throw new Error("Prescription can not be deleted as it does not exist!");

      if (!user.isAdmin && user.name !== prescription.doctor) {
        throw new Error("A prescription can only be cancelled by the same doctor or an admin!");
      }

      await prescription.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
