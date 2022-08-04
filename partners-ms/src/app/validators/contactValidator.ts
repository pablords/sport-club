import niv from "node-input-validator"
import { contactTranslate } from "./contactTranslate"

export async function fieldValidated (data: Object) {
  const v = new niv.Validator(data, {
    email: "required|email",
    phone: "required|integer",
    address: "required|string",
    partnerId: "required|integer"
  })

  niv.addCustomMessages({
    "email.required": contactTranslate.required.email,
    "phone.required": contactTranslate.required.phone,
    "address.required": contactTranslate.required.address,
    "partnerId.required": contactTranslate.required.partnerId,

    "phone.integer": contactTranslate.type.integer,
    "email.email": contactTranslate.custom.email,
    "partnerId.integer": contactTranslate.type.integer,

    "address.string": contactTranslate.type.string
  })

  const matched = await v.check()

  if (!matched) return v.errors
}
