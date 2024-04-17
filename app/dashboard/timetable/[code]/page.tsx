

import TeacherCard from "@/components/TeacherCard";
import { TEACHERS } from "@/lib/data";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export default function SubjectTeachers() {
 
  return (
    <main className="p-4 max-sm:pb-20">
    
      <div className="flex flex-wrap max-md:justify-center  items-stretch gap-12 max-lg:gap-8 w-full max-sm:flex-col   ">
        {TEACHERS.map((teacherObj) => (
          
          <TeacherCard
            key={teacherObj.id}
            name={teacherObj.name}
            image={teacherObj.image}
          />
        ))}
      </div>
    </main>
  );
}
