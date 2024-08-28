import { createClient } from "./create-client";
import { AzureFunctionHttpRequest } from "../../core";
import { readClients } from "./read-clients";

const httpTrigger: AzureFunctionHttpRequest = async function (
  context,
  req,
): Promise<void> {
  switch (req.method) {
    case "POST":
      await createClient(context, req);
      break;
    case "GET":
      await readClients(context, req);
      break;
  }
};

export default httpTrigger;
