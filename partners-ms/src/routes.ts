import express from "express"
import PartnerController from "@/app/controllers/PartnerController"
import ModalityController from "@/app/controllers/ModalityController"
import ContractController from "@/app/controllers/ContractController"
import RegisterController from "@/app/controllers/RegisterController"
import ContactController from "@/app/controllers/ContactController"
import { keycloak } from "@/infra/services/keycloak/config"
import {
  contactRequestValidate,
  contractRequestValidate,
  modalityRequestValidate,
  partnerRequestValidate,
  registerRequestValidate
} from "@/app/middleware/request-validated"

export const router = express.Router()

router.get(
  "/contacts",
  keycloak.protect("view"),
  ContactController.getAllContacts
)
router.get(
  "/contacts/:id",
  keycloak.protect("view"),
  ContactController.getContact
)
router.post(
  "/contacts",
  keycloak.protect("edit"),
  contactRequestValidate.create,
  ContactController.saveOneContact
)
router.put(
  "/contacts/:id",
  keycloak.protect("edit"),
  ContactController.updateContact
)
router.delete(
  "/contacts/:id",
  keycloak.protect("delete"),
  ContactController.deleteContact
)

router.get(
  "/partners",
  keycloak.protect("view"),
  PartnerController.getAllPartners
)
router.get(
  "/partners/:id",
  keycloak.protect("view"),
  PartnerController.getPartner
)
router.post(
  "/partners",
  keycloak.protect("edit"),
  partnerRequestValidate.create,
  PartnerController.savePartner
)
router.put(
  "/partners/:id",
  keycloak.protect("edit"),
  PartnerController.updatePartner
)
router.delete(
  "/partners/:id",
  keycloak.protect("delete"),
  PartnerController.deletePartner
)

router.get(
  "/modalities",
  keycloak.protect("view"),
  ModalityController.getAllModality
)
router.get(
  "/modalities/:id",
  keycloak.protect("view"),
  ModalityController.getModality
)
router.post(
  "/modalities",
  keycloak.protect("edit"),
  modalityRequestValidate.create,
  ModalityController.saveModality
)
router.put(
  "/modalities/:id",
  keycloak.protect("edit"),
  ModalityController.updateModality
)
router.delete(
  "/modalities/:id",
  keycloak.protect("delete"),
  ModalityController.deleteModality
)

router.get(
  "/contracts",
  keycloak.protect("view"),
  ContractController.getAllContracts
)
router.get(
  "/contracts/:id",
  keycloak.protect("view"),
  ContractController.getContract
)
router.post(
  "/contracts",
  keycloak.protect("edit"),
  contractRequestValidate.create,
  ContractController.saveOneContract
)
router.put(
  "/contracts/:id",
  keycloak.protect("edit"),
  ContractController.updateContractStatus
)
router.delete(
  "/contracts/:id",
  keycloak.protect("delete"),
  ContractController.deleteContract
)

router.get(
  "/register/:partnerId",
  keycloak.protect("view"),
  RegisterController.getRegister
)
router.post(
  "/register",
  keycloak.protect("edit"),
  registerRequestValidate.create,
  RegisterController.saveRegister
)
