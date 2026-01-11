var admin = require("firebase-admin");
const dotenv = require("dotenv");

dotenv.config();

console.log('FB_PRIVATE_KEY_ID:', process.env.FB_PRIVATE_KEY_ID);
console.log('FB_CLIENT_EMAIL:', process.env.FB_CLIENT_EMAIL);
console.log('FB_PRIVATE_KEY:', process.env.FB_PRIVATE_KEY);

var serviceAccount = {
  "type": "service_account",
  "project_id":  process.env.FB_PROJECT_ID, // "tr-pm-49ecb",
  "private_key_id": process.env.FB_PRIVATE_KEY_ID, //"bbcfcda41bc140561a225ad861276fc0262c0fd9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQD0zxLKudfc2Gez\nzhV84n3Uk/AsqEw+lggg5W5frY18+qlAqZSJnz6MYseEejo7jYAzxDVMsfXPPf+v\nWW0NlEnc/4sVp6UWljCu5iEzMKwYYbKDT2xCHpN8E2QTrtigzX22jZIF6WFprM6b\ncCcZe94iW+uIwdr91fCn4OUWCRbWs1mcOTH5mkFefRiJ0c9serJUhMEc9iwJoZgp\np9XIULOidF5LCGWAvxu+VmrkVdh4oJZ8Xz8kt6eEq5hWsbaWuKIuIigBdZHMJHvR\n+qX41DNmSBDjLnROktcYZNsHmnbNyqHmUBPJvGV0w0tXePLpzzc4RyNlX7QQLXCV\nojE9DWUBAgMBAAECggEAHPK8EoIXlR83Yw8KYjA/qCKevs8fZfK0jxxGORTjE11q\nJHHxFTWCDlRzapZP+sEMoQJxeYpdKmaWzJ++2iFX+ySyKAtBBarYoqPmluCpZwAt\nfWLHxslKEBzUY5H0Po6SECNNOjr6yIXVUBLa4sPvlGFJeKxQtp2k5Zsdx8VnIJfN\nOlGx1R8Ap804fjfG2cAY9SekdkXIe/Sd/FaekNv2KwQM3zuEvubtrSH+LI/9XgH9\nkNDlA0pTIlPmfaS7QnUAmtee9TR6yv0wy6N7JlaxF0uTICPhJRMFH53P9jag4jgs\nk9xfXORLmKIcM9nvwSxn7F9Yj0r6GGqoJ1XClCg3mQKBgQD81pTTFS3lDgAcXihl\n/zNfEsrtPDPNXAEaU0kAjAAsJs6bsP0kcB3BB1QSKnlP9tetpmVdJjtlrltPEPCz\na+0hIlbsMXH6eqVINK5O9kg/XsZpQFJ/PQysQ8UKLAl3m3pzqymPe329tgiC7ILJ\n9asfVSddzezWOs2Jprq8lbO/2QKBgQD33smbcf7NjXw2Hjub8WhRtUy++Xbw4NFa\nzWTm5rK6z2KfX8nKP7oIPV1aXQ5BcWaMfOKWUd5CPJ5LHNeqFtq/RkwyN8Rluz8/\nNwhjUi4XARzyCr4E6wBMoMFGzNJyNG35v1MfJKMz09TZD1VcLFSVdMpXHAIa40C9\nlmWaOWU9aQKBgAt+KYeqx8pIp6KieQ2h2xDwRr8f5G7qRraOoJvgwUVAglW7ZtZY\nLlIO5jhpK9iBrO4cyTDBwyNtGINwjrBpMH84E2FrIfYzyv2MP3whX8lZooU4Qke8\nW64c6oD63XdNXvSRDDOUdnPAKYTiAVPy0dN7yG1QJfra82rVZFmcKG6JAoGAJNG0\nMuH5DoGQzN0qz5xJebGrp8aYs2lBz/Iopd/o9rTtmmz5JZDXyneLEWw3PONib0Xx\nxpB8qmwku1Wad4qTjcwcb203QEFTQMmk9lPzwrkImq+b0FE0Jy3N5/1u2UYOfAW+\njCa+E2nI+UE81cdD/Ttu/weLDIFrUX4ws3sJHdkCgYB27WFaBLZySmgfKbh6rbO9\nLevfQ1A/57TtgKpWHckA+ujGdi0TL5UrogpYChYDpG+mi3jePupfk5Ya9702sHBV\nRNE2ypJ/R+SBga3o53UodQA4+oLTyIT5P0/B3Is674oP93FYaVqmzkBzDXCvivre\n7gKLip4/6tjfDd6bgisZuw==\n-----END PRIVATE KEY-----\n",
  "client_email": process.env.FB_CLIENT_EMAIL,// "firebase-adminsdk-fbsvc@tr-pm-49ecb.iam.gserviceaccount.com",
  "client_id": process.env.FB_CLIENT_ID, // "106175611942752778284",
  "auth_uri":process.env.FB_AUTH_URI, // "https://accounts.google.com/o/oauth2/auth",
  "token_uri":process.env.FB_TOKEN_URI, // "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": process.env.FB_AUTH_PROVIDER,// "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": process.env.FB_CLIENT_URL, // "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tr-pm-49ecb.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
module.exports = { admin, db };