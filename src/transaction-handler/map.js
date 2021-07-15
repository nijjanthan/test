module.exports = function () {
  const success = true;
  return {

    error(req, res, error) {
      res.status(200).send({ success: false, error });
    },

    healthcheck(req, res) {
      const result = {
        last_push: new Date().toISOString()
      };
      res.status(200).send(result);
    },

    getAll(req, res, data) {
      console.log(JSON.stringify(data), "222222data>>>>>>>>>>>>>>>>>>>")
      const result = {
        success,
        data
      };
      res.status(200).send(result);
    },

    get(req, res, data) {
      console.log("data")
      console.log(JSON.stringify(data),"data")
      const result = {
        success,
        data: data[0],
        message: 'Login sucessfully',
      };
      res.status(200).send(result);
    },

    post(req, res, data) {
      console.log(JSON.stringify(data),"post<<<<<<<<<<<<<<")
      const result = {
        success,
        data,
        message: 'Create Successful.',
      };
      res.status(200).send(result);
    },
    update(req, res, data) {
      console.log(JSON.stringify(data),"update<<<<<<")
      const result = {
        success,
        data,
        message: 'Updated Successful.',
      };
      res.status(200).send(result);
    },
    put(req, res, data){
      console.log(JSON.stringify(data),"put<<<<<<<<<<<<<<")
      const result = {
        success,
        data,
        message:'Success............................'
      };
      res.status(200).send(result)
    },
    delete(req, res, data) {
      console.log("deleteeeeeeeeeeee");
      const result = {
        success,
        data,
        message: 'Create Successful.',
      };
      res.status(200).send(result);
    },
  };
}();