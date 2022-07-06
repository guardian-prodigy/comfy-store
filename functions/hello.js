

exports.handler = async (event, context) => {
    console.log("success");
    return {
        statusCode: 200,
        body: "Hello World"
    }
}