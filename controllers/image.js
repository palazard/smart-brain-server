
const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");


const handleClarifyAPICall = (req, res) => {

    const stub = ClarifaiStub.grpc();

    const PAT = PAT_CLARIFAI;
    const USER_ID = 'palazard';       
    const APP_ID = 'facerecognitionbrain-001';
    const MODEL_ID = 'face-detection'; 
    const IMAGE_URL =  req.body.imageURL;


    // This will be used by every Clarifai endpoint call
    const metadata = new grpc.Metadata();
    metadata.set("authorization", "Key " + PAT);

    stub.PostModelOutputs(
        {
            user_app_id: {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            model_id: MODEL_ID,
            // version_id: MODEL_VERSION_ID,  // This is optional. Defaults to the latest model version
            inputs: [
                { data: { image: { url: IMAGE_URL } } }
            ]
        },
        metadata,
        (err, response) => {
            if (err) {
                throw new Error(err);
            }

            if (response.status.code !== 10000) {
                throw new Error("Post model outputs failed, status: " + response.status.description);
            }

            res.json(response);

        }
    );
}

const handleImage = (req, res, db) => {

    const id = req.body.id
    db('users').where({id})
    .returning('entries')
    .increment({
        entries: 1
      })
    .then(entries=> res.json(entries[0].entries))
    .catch(err=> res.status(400).json('error getting user'));

}

module.exports= {
    handleClarifyAPICall:handleClarifyAPICall,
    handleImage:handleImage
}