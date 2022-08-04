
import RegisterController from "@/app/controllers/RegisterController"
import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { ISavePartnersDTOResponse, SavePartnersDTOResponse } from "@/app/dto/register-dto"
import { SavePartner, GetFullRegisterDataPartner } from "@/app/core/use-cases/partner"
import { GetModalityList, SaveModality } from "@/app/core/use-cases/modality"
import { GetContact, SaveContact, GetEmailContact } from "@/app/core/use-cases/contact"
import { SaveContract, SaveOneContract } from "@/app/core/use-cases/contract"
import { entityManager } from "@/infra/db/config"
import { PartnerModel } from "@/infra/models/PartnerModel"
import { ContactModel } from "@/infra/models/ContactModel"
import { Repository } from "typeorm"
import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"
import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { ContractRepositoryDb } from "@/app/repository/ContractRepositoryDb"
import { ModalityModel } from "@/infra/models/ModalityModel"
import EntityMock from "../../../../mocks/entities"
import { ContractModel } from "@/infra/models/ContractModel"

jest.mock("@/app/core/use-cases/modality")

jest.mock("@/app/repository/ModalityRepositoryDb")

jest.mock("@/app/core/use-cases/notification/ProducerNotification")

const ContactRepositoryMock = entityManager.getRepository(ContactModel)
const contactRepositoryMock = ContactRepositoryMock as jest.Mocked<Repository<ContactModel>>
const contactRepository = new ContactRepositoryDb(contactRepositoryMock)
const getEmailContact = new GetEmailContact(contactRepository)
const saveContact = new SaveContact(contactRepository)

const ModalityRepositoryMock = entityManager.getRepository(ModalityModel)
const modalityRepositoryMock = ModalityRepositoryMock as jest.Mocked<Repository<ModalityModel>>
const modalityRepository = new ModalityRepositoryDb(modalityRepositoryMock)
const getModalityList = new GetModalityList(modalityRepository)
const saveModality = new SaveModality(modalityRepository)

const PartnerRepositoryMock = entityManager.getRepository(PartnerModel)
const partnerRepositoryMock = PartnerRepositoryMock as jest.Mocked<Repository<PartnerModel>>
const partnerRepositoryDb = new PartnerRepositoryDb(partnerRepositoryMock)
const savePartner = new SavePartner(partnerRepositoryDb)
const getFullRegisterDataPartner = new GetFullRegisterDataPartner(partnerRepositoryDb)

const ContractRepositoryMock = entityManager.getRepository(ContractModel)
const contractRepositoryMock = ContractRepositoryMock as jest.Mocked<Repository<ContractModel>>
const contractRepositoryDb = new ContractRepositoryDb(contractRepositoryMock)
const saveContract = new SaveContract(contractRepositoryDb)

const contacts = EntityMock.getContact()
const partner = EntityMock.getPartner() as PartnerModel

describe("Testes de unidade RegisterController", () => {
  let res, next
  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() }
    next = jest.fn()
  })
  afterEach(() => {
    jest.resetAllMocks()
    jest.clearAllMocks()
  })
  describe("Testes de unidade metodo saveRegister", () => {
    it("Deve retornar statusCode 400 caso exista um email cadastrado", async () => {
      const req = {
        body: {
          contacts: [
            {
              email: "pablords@gmail.com",
              phone: 99999999999,
              address: "endereco 6"
            },
            {
              email: "pablojds@yahoo.com",
              phone: 99999999999,
              address: "endereco 7"
            }
          ]
        }
      } as any
      jest.spyOn(getEmailContact, "execute").mockResolvedValueOnce(req.body.contacts)
      jest.spyOn(contactRepository, "findEmail").mockResolvedValueOnce(req.body.contacts[0])
      jest.spyOn(contactRepositoryMock, "findOne").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.EMAIL_EXISTS
        )
      )
      await RegisterController.saveRegister(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.EMAIL_EXISTS
        )
      )
    })

    it("Deve retornar statusCode 400 caso nao seja passado contacts no payload", async () => {
      const req = { body: { contacts: [] } } as any
      jest.spyOn(saveContact, "execute").mockResolvedValueOnce(req.body?.contacts)
      jest.spyOn(contactRepository, "saveOneContact").mockResolvedValueOnce(req.body?.contacts)
      jest.spyOn(contactRepositoryMock, "save").mockRejectedValueOnce(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.CONTACT_NOT_CREATED
        )
      )
      await RegisterController.saveRegister(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.CONTACT_NOT_CREATED
        )
      )
    })

    // it("Deve retornar statusCode 400 caso nao encontre nenhuma modalidade", async () => {
    //   const req = { body: { modalities: [], contacts: [] } } as any
    //   jest.spyOn(getModalityList, "execute").mockResolvedValueOnce(req.body?.modalities)
    //   jest.spyOn(modalityRepository, "findOne").mockResolvedValueOnce(req.body?.modalities)
    //   jest.spyOn(modalityRepositoryMock, "findOne").mockRejectedValueOnce(
    //     new APIError("BAD_REQUEST",
    //       HttpStatusCode.BAD_REQUEST,
    //       true,
    //       businessError.MODALITY_NOT_FOUND,
    //       undefined
    //     )
    //   )
    //   await RegisterController.saveRegister(req, res, next)
    //   expect(res.status).toBeCalledWith(400)
    //   expect(res.send).toBeCalledWith(
    //     new APIError("BAD_REQUEST",
    //       HttpStatusCode.BAD_REQUEST,
    //       true,
    //       businessError.MODALITY_NOT_FOUND,
    //       undefined
    //     )
    //   )
    // })

    // it("Deve retornar statusCode 400 caso nao seja passado nenhuma modalidade no payload", async () => {
    //   const req = { body: { modalities: [], contacts: [] } } as any
    //   jest.spyOn(saveModality, "execute").mockResolvedValueOnce(req.body?.modalities)
    //   jest.spyOn(modalityRepository, "createMany").mockResolvedValueOnce(req.body?.modalities)
    //   jest.spyOn(modalityRepositoryMock, "save").mockRejectedValueOnce(
    //     new APIError("BAD_REQUEST",
    //       HttpStatusCode.BAD_REQUEST,
    //       true,
    //       businessError.MODALITY_NOT_FOUND,
    //       undefined
    //     )
    //   )
    //   await RegisterController.saveRegister(req, res, next)
    //   expect(res.status).toBeCalledWith(400)
    //   expect(res.send).toBeCalledWith(
    //     new APIError("BAD_REQUEST",
    //       HttpStatusCode.BAD_REQUEST,
    //       true,
    //       businessError.MODALITY_NOT_FOUND,
    //       undefined
    //     )
    //   )
    // })

    it("Deve passar por validacao de email sem erro caso nao exista um email existente", async () => {
      const req = {
        body: {
          contacts: [
            {
              email: "pablords@gmail.com",
              phone: 99999999999,
              address: "endereco 6"
            },
            {
              email: "pablojds@yahoo.com",
              phone: 99999999999,
              address: "endereco 7"
            }
          ]
        }
      } as any
      jest.spyOn(getEmailContact, "execute").mockResolvedValueOnce(req.body.contacts)
      jest.spyOn(contactRepository, "findEmail").mockResolvedValueOnce(req.body.contacts[0])
      const spyRepoMock = jest.spyOn(contactRepositoryMock, "findOne").mockResolvedValueOnce(req.body.contacts[0])
      await RegisterController.saveRegister(req, res, next)
      expect(spyRepoMock).toBeCalled()
    })

    it("Deve salvar contato caso seja passados todos dados no payload", async () => {
      const req = {
        body: {
          contacts: [
            {
              email: "pablords@gmail.com",
              phone: 99999999999,
              address: "endereco 6"
            },
            {
              email: "pablojds@yahoo.com",
              phone: 99999999999,
              address: "endereco 7"
            }
          ]
        }
      } as any
      jest.spyOn(saveContact, "execute").mockResolvedValueOnce(req.body?.contacts)
      jest.spyOn(contactRepository, "saveOneContact").mockResolvedValueOnce(req.body?.contacts)
      const spyRepoMock = jest.spyOn(contactRepositoryMock, "save").mockResolvedValueOnce(req.body.contacts[0])
      await RegisterController.saveRegister(req, res, next)
      expect(spyRepoMock).toBeCalled()
    })

    it("Deve salvar uma lista modalidades caso seja passado no paylod", async () => {
      const req = {
        body: {
          modalities: [
            {
              id: 4,
              contract: {
                start: "2021-01-01",
                dueDate: "2021-02-01",
                isActive: true,
                status: "ativo"
              }
            },
            {
              id: 5,
              contract: {
                start: "2021-01-01",
                dueDate: "2021-02-01",
                isActive: true,
                status: "ativo"
              }
            }
          ]
        }
      } as any
      jest.spyOn(saveModality, "execute").mockResolvedValueOnce(req.body?.modalities)
      jest.spyOn(modalityRepository, "createMany").mockResolvedValueOnce(req.body?.modalities)
      jest.spyOn(modalityRepositoryMock, "save").mockReturnValue(req.body?.modalities[0])
      await RegisterController.saveRegister(req, res, next)
      // expect(res.status).toBeCalledWith(201)
      // expect(res.send).toBeCalledWith(req.body?.modalities)
    })

    it("Deve salvar um registro caso todos os dados sejam passados no paylod", async () => {
      const req = {
        body: {
          partner: {
            name: "pablo",
            surname: "ruan",
            birthDate: "1990-02-24"
          },
          contacts: [
            {
              email: "pablords@gmail.com",
              phone: 99999999999,
              address: "endereco 6"
            }
          ],
          modalities: [
            {
              id: 4,
              contract: {
                start: "2021-01-01",
                dueDate: "2021-02-01",
                isActive: true,
                status: "ativo"
              }
            }
          ]
        }
      } as any

      jest.spyOn(getModalityList, "execute").mockResolvedValueOnce(req.body?.modalities)
      jest.spyOn(modalityRepository, "findOne").mockResolvedValueOnce(req.body?.modalities)
      jest.spyOn(modalityRepositoryMock, "findOne").mockResolvedValueOnce(req.body?.modalities)

      const resultModality: any = await getModalityList.execute(req.body.modalities)

      jest.spyOn(saveModality, "execute").mockResolvedValueOnce(req.body?.modalities)
      jest.spyOn(modalityRepository, "createMany").mockResolvedValueOnce(req.body?.modalities)
      jest.spyOn(modalityRepositoryMock, "save").mockResolvedValueOnce(req.body?.modalities)

      const modalities = await saveModality.execute(resultModality)

      const dataPartner = req.body.partner
      dataPartner.contacts = contacts
      dataPartner.modalities = modalities
      jest.spyOn(savePartner, "execute").mockResolvedValueOnce(dataPartner)
      jest.spyOn(partnerRepositoryDb, "create").mockResolvedValueOnce(dataPartner)
      jest.spyOn(partnerRepositoryMock, "save").mockResolvedValueOnce(dataPartner)
      const partner = await savePartner.execute(dataPartner)

      jest.spyOn(saveContract, "execute").mockResolvedValueOnce(req.body.modalities)
      jest.spyOn(contractRepositoryDb, "create").mockResolvedValueOnce(req.body.modalities)
      jest.spyOn(contractRepositoryMock, "save").mockResolvedValueOnce(req.body.modalities)

      const contract = await saveContract.execute(req.body.modalities, partner.id)

      const resultformatData = SavePartnersDTOResponse.execute(partner, contract)
      await RegisterController.saveRegister(req, res, next)
      expect(res.status).toBeCalledWith(201)
      // expect(res.send).toBeCalledWith(resultformatData)
    })
  })

  describe("Testes de unidade metodo getRegister", () => {
    it("Deve retornar statusCode 400 caso nao seja passado um id", async () => {
      const req = { params: { id: null } } as any
      jest.spyOn(getFullRegisterDataPartner, "execute").mockResolvedValueOnce(req.params.id)
      jest.spyOn(partnerRepositoryDb, "findRelationsOne").mockResolvedValueOnce(req.params.id)
      jest.spyOn(partnerRepositoryMock, "findOne").mockRejectedValueOnce(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND
        ))
      await RegisterController.getRegister(req, res, next)
      expect(res.status).toBeCalledWith(400)
      expect(res.send).toBeCalledWith(
        new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND
        )
      )
    })
    it("Deve retornar um sócio caso seja passado um id", async () => {
      const req = { params: { partnerId: 1 } } as any
      jest.spyOn(getFullRegisterDataPartner, "execute").mockResolvedValueOnce(partner)
      jest.spyOn(partnerRepositoryDb, "findRelationsOne").mockResolvedValueOnce(partner)
      jest.spyOn(partnerRepositoryMock, "findOne").mockResolvedValueOnce(partner)

      const result = await getFullRegisterDataPartner.execute(req.params.id, ["contacts", "modalities", "contracts"])

      await RegisterController.getRegister(req, res, next)
      expect(res.status).toBeCalledWith(200)
      expect(res.send).toBeCalledWith(result)
    })
  })
})
