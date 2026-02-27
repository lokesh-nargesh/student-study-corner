export interface environment {
    production: boolean;
    apiUrl: string;
    firebaseConfig: any;
}

// export const environment = {
//     production: false,
//     apiUrl: 'http://localhost:8080/api',
//     firebaseConfig: {
//         apiKey: "YOUR_API_KEY",
//         authDomain: "YOUR_PROJECT.firebaseapp.com",
//         projectId: "YOUR_PROJECT_ID",
//         storageBucket: "YOUR_PROJECT.appspot.com",
//         messagingSenderId: "YOUR_SENDER_ID",
//         appId: "YOUR_APP_ID"
//     }
// };

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080/api',
    firebaseConfig: {
        apiKey: "AIzaSyB90PQSlyw1Ns-FRoxTtMrJZ9EPFX8N-kE",
        authDomain: "study-material-e3315.firebaseapp.com",
        projectId: "study-material-e3315",
        storageBucket: "study-material-e3315.firebasestorage.app",
        messagingSenderId: "55715845054",
        appId: "1:55715845054:web:603084bf02fcfb46f91fef",
        measurementId: "G-RRZ5ECETWM"
    }
};
