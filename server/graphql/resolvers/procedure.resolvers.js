const { Item, Patient, Visit, Procedure } = require("../../models");

const include = [
  {
    model: Item,
    as: "procedure",
  },
];

const resolvers = {
  Query: {
    procedures: async (_, { visitId }, { authenticate }) => {
      await authenticate();
      const where = visitId ? { visitId } : {};

      const procedures = await Procedure.findAll({
        where,
        include: [...include, { model: Visit, as: "visit" }],
      });

      const populate = async p => {
        const patient = await Patient.findByPk(p.visit.patientId);
        p.patient = patient;
        return p;
      };

      const data = [];
      for (const p of procedures) {
        data.push(await populate(p));
      }
      return data;
    },
    procedure: async (_, { id }, { authenticate }) => {
      await authenticate();

      const procedure = await Prescription.findByPk(id, {
        include: [...include, { model: Visit, as: "visit" }],
      });

      if (!procedure) throw new Error("Procedure not found!");

      const patient = await Patient.findByPk(procedure.visit.patientId);

      procedure.patient = patient;

      return procedure;
    },
  },
  Mutation: {
    saveProcedures: async (_, { visitId, procedures }, { user, authenticate }) => {
      await authenticate();

      const data = [];
      let errorOccured = false;

      /* Loop through array of procedure ids */
      for (const procedure of procedures) {
        const dbProcedure = await Item.findOne({
          id: procedure,
          type: "PROCEDURE",
        });

        if (dbProcedure) {
          const p = await Procedure.create({
            visitId,
            doctor: user.name,
            procedureId: procedure,
          });

          const populated = await Procedure.findByPk(p.id, { include });
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
        throw new Error("One or more ID(s) of procedures is invalid!");
      }

      return data;
    },
    saveProcedureNotes: async (_, { procedureId, notes }, { authenticate }) => {
      await authenticate();
      const procedure = await Procedure.findByPk(procedureId);
      if (!procedure) throw new Error("Procedure not found!");

      await procedure.update({ notes });

      return await Procedure.findByPk(prescriptionId, { include });
    },
    deleteProcedure: async (_, { id }, { user, authenticate }) => {
      await authenticate();

      const procedure = await Procedure.findByPk(id);
      if (!procedure) throw new Error("Procedure can not be deleted as it does not exist!");

      if (!user.isAdmin && user.name !== procedure.doctor) {
        throw new Error("A procedure can only be cancelled by the same doctor or an admin!");
      }

      await procedure.destroy();
      return "Deleted successfully!";
    },
  },
};

module.exports = resolvers;
