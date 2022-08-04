import niv from "node-input-validator"
import { modalityTanslate } from "./modalityTranslate"

export async function fieldValidated (data: any) {
  const v = new niv.Validator(data, {
    name: "required|string"
  })

  niv.addCustomMessages({
    "name.required": modalityTanslate.required.name,
    "name.string": modalityTanslate.type.string
  })

  const matched = await v.check()

  if (!matched) return v.errors
}
