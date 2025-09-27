"use server";
import { getOnlineCourses as getCourses, getCourseById as getCourse } from "../../../utils/courseDatabase";

export async function getOnlineCourses() {
    return await getCourses();
}

export async function getCourseById(courseId) {
    return await getCourse(courseId);
}