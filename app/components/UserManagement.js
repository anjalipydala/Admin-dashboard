import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase";

const handleSave = async () => {
  if (role === "admin") {
    await addDoc(collection(db, "users", "admin"), {
      role: "admin",
      username,
      password,
    });
  }

  if (role === "staff") {
    await addDoc(collection(db, "users", "staff"), {
      role: "staff",
      username,
      password,
      subject,
    });
  }

  if (role === "student") {
    await addDoc(collection(db, "users", "students"), {
      role: "student",
      username,
      password,
      className,
      section,
    });
  }

  alert("User Saved Successfully");
};