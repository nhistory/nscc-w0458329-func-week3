module.exports = async function (context, req) {

  context.log('JavaScript HTTP trigger function processed a request.')

  // Variable to store the response message
  let responseMessage = ""

  // Get the body of the POST message
  const body = req.body
  
  // Verify name has a value
  if (body.name) {
      responseMessage = "true"

      // Send the name to the Queue
      context.bindings.outputQueueItem = (body.name)
  }
  else {
      responseMessage = "false"
  }

  // Send the response (200 ok) to the requestor
  context.res = {
      body: responseMessage
  }
}