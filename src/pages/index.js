/*********************************************************************************
* WEB422 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Nabin Uprety Student ID: 172005233  Date: 2025/12/05
* Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);
  return null;
}
