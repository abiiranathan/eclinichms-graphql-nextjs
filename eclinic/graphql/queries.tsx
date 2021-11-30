import { gql } from "@apollo/client";

export const GET_ITEMS = gql`
  query FetchItems($type: ItemType, $name: String, $page: Int, $pageSize: Int) {
    items(type: $type, name: $name, page: $page, pageSize: $pageSize) {
      rows {
        id
        name
        cost
      }
      count
      totalPages
      hasNext
      hasPrev
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        id
        name
        username
        email
        age
        sex
        mobile
        isAdmin
        createdAt
        updatedAt
        role
      }
      token
    }
  }
`;

export const LOGIN_STATUS = gql`
  query VerifyLoginStatus {
    currentUser {
      id
      name
      username
      email
      age
      sex
      mobile
      isAdmin
      createdAt
      updatedAt
      role
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($user: RegisterInput!) {
    registerUser(user: $user) {
      user {
        id
        name
        username
        email
        age
        sex
        mobile
        isAdmin
        createdAt
        updatedAt
        role
      }
      token
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers($role: UserRole) {
    users(role: $role) {
      id
      name
      username
      email
      age
      sex
      mobile
      isAdmin
      createdAt
      updatedAt
      role
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user: UserUpdates!) {
    updateUser(id: $id, user: $user) {
      id
      username
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const SEARCH_PATIENTS = gql`
  query SearchPtients($name: String!, $page: Int!) {
    patients(name: $name, page: $page, pageSize: 20) {
      count
      hasNext
      hasPrev
      totalPages
      rows {
        id
        name
        sex
        birthDate
        mobile
        nextOfKin
        occupation
        visits {
          id
          reason
          doctor {
            id
            name
          }
          department
          createdAt
        }
      }
    }
  }
`;

export const GET_PATIENTS = gql`
  query GetPatients($name: String, $page: Int) {
    patients(name: $name, page: $page, pageSize: 100) {
      count
      hasNext
      hasPrev
      totalPages
      rows {
        id
        name
        birthDate
        sex
        address
        nextOfKin
        religion
        maritalStatus
        tribe
        occupation
        allergies
        chronicIllness
        mobile
        email
        createdAt
        updatedAt

        visits {
          id
          reason
          department
          doctor {
            id
            name
          }
        }
      }
    }
  }
`;

export const REGISTER_PATIENT = gql`
  mutation RegisterPatient($data: PatientInput!) {
    registerPatient(data: $data) {
      id
      name
      birthDate
      sex
      address
      nextOfKin
      religion
      maritalStatus
      tribe
      occupation
      allergies
      chronicIllness
      mobile
      email
      createdAt
      updatedAt
    }
  }
`;

export const GET_PATIENT = gql`
  query GetPatient($id: ID!) {
    patient(id: $id) {
      id
      name
      birthDate
      sex
      address
      nextOfKin
      religion
      maritalStatus
      tribe
      occupation
      allergies
      chronicIllness
      mobile
      email
      createdAt
      updatedAt
      medicalInfo {
        id
        hypertension
        diabetes
        hiv
        cancer
        heart_disease
        liver_disease
        smoking
        alcohol
        sickle_cell
        allergies
        medication
        previous_surgery
        pregnancy
        createdAt
        updatedAt
        patientId
      }
      visits {
        id
        reason
        department
        patientId
        isDischarged
        seenDoctor
        createdAt
        ward {
          id
          name
        }
        doctor {
          id
          name
        }
        consultation {
          id
          name
        }
        clerkship {
          id
        }
      }
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($id: ID!, $data: PatientInput!) {
    updatePatient(id: $id, data: $data) {
      id
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: ID!) {
    deletePatient(id: $id)
  }
`;

export const SAVE_MEDICAL_PROFILE = gql`
  mutation SaveMedicalProfile($data: MedicalInfoInput!) {
    saveMedicalInfo(data: $data) {
      id
      hypertension
      diabetes
      hiv
      cancer
      heart_disease
      liver_disease
      smoking
      alcohol
      sickle_cell
      allergies
      medication
      previous_surgery
      pregnancy
      createdAt
      updatedAt
      patientId
    }
  }
`;

export const UPDATE_MEDICAL_PROFILE = gql`
  mutation UpdateMedicalProfile($id: ID!, $data: MedicalInfoInput!) {
    updateMedicalInfo(id: $id, data: $data) {
      id
      hypertension
      diabetes
      hiv
      cancer
      heart_disease
      liver_disease
      smoking
      alcohol
      sickle_cell
      allergies
      medication
      previous_surgery
      pregnancy
      createdAt
      updatedAt
      patientId
    }
  }
`;

// Visits
export const GET_VISITS = gql`
  query GetVisits(
    $name: String
    $doctor: ID
    $reason: Reason
    $page: Int = 1
    $pageSize: Int = 50
    $ordering: Order
  ) {
    visits(
      name: $name
      doctor: $doctor
      reason: $reason
      page: $page
      pageSize: $pageSize
      ordering: $ordering
    ) {
      count
      hasNext
      hasPrev
      totalPages
      rows {
        id
        reason
        department
        patientId
        isDischarged
        seenDoctor
        createdAt
        patient {
          id
          name
          email
          birthDate
          sex
        }
        ward {
          id
          name
        }
        doctor {
          id
          name
        }
        consultation {
          id
          name
        }
        clerkship {
          id
        }
      }
    }
  }
`;

// Visits
export const GET_VISIT = gql`
  query GetVisit($id: ID!) {
    visit(id: $id) {
      id
      reason
      department
      patientId
      isDischarged
      seenDoctor
      createdAt
      patient {
        id
        name
        birthDate
        sex
      }
      ward {
        id
        name
      }
      doctor {
        id
        name
      }
      consultation {
        id
        name
      }
      clerkship {
        id
        pc
        hpc
        ros
        past_history
        jaundice
        pallor
        cyanosis
        clubbing
        oedema
        lymphadenopathy
        skin
        systemic_examination
        diagnosis
        differentials
        plan
        createdAt
        updatedAt
      }
      vitals {
        id
        sbp
        dbp
        pulse
        temperature
        resp
        spo2
        weight
        height
        gcs
        muac
        user {
          id
          name
        }
        createdAt
        updatedAt
      }

      # Add prescriptions, requests, procedures, consumables etc
    }
  }
`;

export const CREATE_VISIT = gql`
  mutation RegisterVisit($data: NewVisit!) {
    registerVisit(data: $data) {
      id
      reason
      department
      patientId
      isDischarged
      seenDoctor
      createdAt
      ward {
        id
        name
      }
      doctor {
        id
        name
      }
      consultation {
        id
        name
      }
      clerkship {
        id
      }
    }
  }
`;

export const DELETE_VISIT = gql`
  mutation DeleteVisit($id: ID!) {
    deleteVisit(id: $id)
  }
`;

export const GET_WARDS = gql`
  query GetWards {
    wards {
      id
      name
    }
  }
`;

export const GET_CONSULTATIONS = gql`
  query GetConsultations {
    consultations {
      id
      name
      fee
    }
  }
`;

export const SAVE_VITALS = gql`
  mutation SaveVitals($data: VitalsInput!) {
    saveVitals(data: $data) {
      id
      visitId
      sbp
      dbp
      pulse
      temperature
      resp
      spo2
      weight
      height
      gcs
      muac
      user {
        id
        name
      }
      createdAt
    }
  }
`;
