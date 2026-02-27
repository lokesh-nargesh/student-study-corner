export interface environment {
    production: boolean;
    apiUrl: string;
    firebaseConfig: any;
}

export const environment = {
    production: true,
    apiUrl: process.env['API_URL'] || 'https://api.studycorner.com/api',
    firebaseConfig: {
        apiKey: process.env['FIREBASE_API_KEY'] || "AIzaSyB90PQSlyw1Ns-FRoxTtMrJZ9EPFX8N-kE",
        authDomain: process.env['FIREBASE_AUTH_DOMAIN'] || "study-material-e3315.firebaseapp.com",
        projectId: process.env['FIREBASE_PROJECT_ID'] || "study-material-e3315",
        storageBucket: process.env['FIREBASE_STORAGE_BUCKET'] || "study-material-e3315.firebasestorage.app",
        messagingSenderId: process.env['FIREBASE_MESSAGING_SENDER_ID'] || "55715845054",
        appId: process.env['FIREBASE_APP_ID'] || "1:55715845054:web:603084bf02fcfb46f91fef",
        measurementId: process.env['FIREBASE_MEASUREMENT_ID'] || "G-RRZ5ECETWM"
    }
};
