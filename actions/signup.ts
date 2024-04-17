"use server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { z } from "zod";
import {
  createTeacherSchema,
  createStudentSchema,
} from "@/lib/validationSchemas";
import {USERS} from "@/lib/data";

export async function teacherSignup(
  values: z.infer<typeof createTeacherSchema>
) {
  try {
    // 1.) validate the  values using zod

    const validatedValues = createTeacherSchema.safeParse(values);
    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Invalid data!",
      };
    }


    // 2.) check if any user with the same mail id or username already exist
    // const filepath = path.join(__filename, "../../../../../../lib/users.json");
    // const filepath = path.join(process.cwd(),"/lib/users.json");
    // console.log(filepath);
    // // const filepath = data;
    // const existingUsers = await readFile(filepath, "utf-8");
    // console.log(JSON.parse(existingUsers));
    // const parsedJSON: z.infer<typeof createTeacherSchema>[] =
    //   JSON.parse(existingUsers);

    const parsedJSON = USERS;

    for (let user = 0; user < parsedJSON.length; user++) {
      console.log(parsedJSON[user].email);
    
      // if (parsedJSON[user]?.email === validatedValues.data.email) {
      //   return {
      //     status: "error",
      //     message: "User with email already exist",
      //   };
      // }
      
      if (parsedJSON[user]?.username === validatedValues.data.username) {
        return {
          status: "error",
          message: "User with username already exist",
        };
      }
    }

    // 3) create user and save in file

    const newUsers = parsedJSON.push(validatedValues.data);
    console.log(parsedJSON);

    // const write = await writeFile(filepath, JSON.stringify(parsedJSON));

    return {
      status: "success",
      message: "Signed up successfully!",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}

export async function studentSignup(
  values: z.infer<typeof createStudentSchema>
) {
  try {
    // 1.) validate the  values using zod

    const validatedValues = createStudentSchema.safeParse(values);
    if (!validatedValues.success) {
      return {
        status: "error",
        message: "Invalid data!",
      };
    }

    console.log(validatedValues);

    // 2.) check if any user with the same mail id or username already exist
    // const filepath = path.join(process.cwd(),"/lib/users.json");
    // console.log(filepath);
    // const existingUsers = await readFile(filepath, "utf-8");
    // console.log(JSON.parse(existingUsers));
    // const parsedJSON: z.infer<typeof createStudentSchema>[] =
    //   JSON.parse(existingUsers);


    const parsedJSON = USERS;
    for (let user = 0; user < parsedJSON.length; user++) {
      console.log(parsedJSON[user].email);
      console.log(parsedJSON[user].role);
      // if (parsedJSON[user]?.email === validatedValues.data.email) {
      //   return {
      //     status: "error",
      //     message: "User with email already exist",
      //   };
      // }
      if (parsedJSON[user]?.rollno === validatedValues.data.rollno) {
        return {
          status: "error",
          message: "User with username already exist",
        };
      }
    }

    // 3) create user and save in file

    const newUsers = parsedJSON.push(validatedValues.data);
    console.log(parsedJSON);

    // const write = await writeFile(filepath, JSON.stringify(parsedJSON));

    return {
      status: "success",
      message: "Signed up successfully!",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Something went wrong!",
    };
  }
}
