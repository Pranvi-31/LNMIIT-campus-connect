"use server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";

import {
  createStudentSchema,
  createTeacherSchema,
  loginFormSchema,
} from "@/lib/validationSchemas";
import {USERS} from "@/lib/data";

export async function login(values: z.infer<typeof loginFormSchema>) {
  try {
    // 1.) validate the  values using zod

    const validatedValues = loginFormSchema.safeParse(values);
    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Invalid data!",
      };
    }

    console.log(validatedValues);

    // 2.) check if  user with the  rollno or username  exist
    // const filepath = path.join(process.cwd(),"/lib/users.json");
    // console.log(filepath);
    // const existingUsers = await readFile(filepath, "utf-8");
    // console.log(JSON.parse(existingUsers));
    // const parsedJSON: (
    //   | z.infer<typeof createTeacherSchema>
    //   | z.infer<typeof createStudentSchema>
    // )[] = JSON.parse(existingUsers);

    const parsedJSON = USERS;

    const user = parsedJSON.filter((user) => {
      if (user.role === "TEACHER") {
        if (validatedValues.data.userid === user?.username) {
          if (user.password === validatedValues.data.password) {
            return user;
          }
        }
      }

      if (user.role === "STUDENT") {
        if (user?.rollno === validatedValues.data.userid) {
          if (user.password === validatedValues.data.password) {
            return user;
          }
        }
      }
    });

    console.log(user[0]);

    if (!user[0]) {
      return {
        status: "error",
        message: "User does not exist!",
      };
    }

    // 3) return the user and redirect to dashboard page but remove password

    const { password, ...userdetails } = user[0];
    // console.log(userdetails);

    return {
      status: "success",
      message: "Signed up successfully!",
      data: { userdetails },
    };
  } catch (err) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}
