export interface environment {
    production: boolean;
    apiUrl: string;
    firebaseConfig: any;
}

// helpers to read env-like variables without assuming `process` exists
function env(key: string, fallback: string): string {
    if (typeof process !== 'undefined' && process && process.env && process.env[key]) {
        return process.env[key] as string;
    }
    return fallback;
}

export const environment = {
    production: false,
    apiUrl: env('API_URL', 'http://localhost:8080/api'),
    firebaseConfig: {
        apiKey: env('FIREBASE_API_KEY', "AIzaSyB90PQSlyw1Ns-FRoxTtMrJZ9EPFX8N-kE"),
        authDomain: env('FIREBASE_AUTH_DOMAIN', "study-material-e3315.firebaseapp.com"),
        projectId: env('FIREBASE_PROJECT_ID', "study-material-e3315"),
        storageBucket: env('FIREBASE_STORAGE_BUCKET', "study-material-e3315.firebasestorage.app"),
        messagingSenderId: env('FIREBASE_MESSAGING_SENDER_ID', "55715845054"),
        appId: env('FIREBASE_APP_ID', "1:55715845054:web:603084bf02fcfb46f91fef"),
        measurementId: env('FIREBASE_MEASUREMENT_ID', "G-RRZ5ECETWM")
    }
};
