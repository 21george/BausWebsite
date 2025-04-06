import Link from "next/link";
import React from "react";

export default function Ratingpage() {
 const reviewers = [
  {
    id: 1,
    name: "Ingrid Häusler",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "SM",
    rating: 5,
    date: "5 months ago",
    comment:
      "Nach einer Fuß Op konnte ich die erheblichen Probleme die ich durch die einseitige Belastung der Füße angehen.Schmerzen im Rücken und den Lendenwirbel auch beim gehen . Durch gezielte Massagen wurden die Verhärteten Punkte von Frau Baus und ihre Kollegin bearbeitet und ich habe wieder ein neues schmerzfreies Lebensgefühl bekommen . Ich fühlte mich gut aufgehoben und bin froh das ich die für mich richtige Praxis gefunden habe Herzlichen Dank an die Damen",
  },
  {
    id: 2,
    name: "Thomas Pupeter",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "TW",
    rating: 5,
    date: "2 months ago",
    comment: "Was wäre wenn Du nach Deiner Schulter-OP:Ein Physio Deinen OP Bericht studiert, dann an den richtigen Stellen mit der passenden Intensität behandelt und Dein Körper dies neben Wohlbefinden mit sehr schneller Heilung und Mobilität beantwortet? --> Dann hast Du Deinen perfekten Physio gefunden. Ich habe ihn mit Nikolina gefunden. Vielen lieben Dank",
  },
  {
    id: 3,
    name: "Gaga R",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AS",
    rating: 5,
    date: "11 months ago",
    comment: "Frau Baus ist eine Wohltat.Warmherzig, empathisch, ruhig, humorvoll und tiefsinnig.Sie hat ein tolles Gespür dafür, wo der Schmerz entsteht und wie sie ansetzt. Nach der ersten Anwendung war ich schmerzfrei, was der Osteopath nach drei Stunden nicht ansatzweise geschafft hat. Sie hat goldenen Hände! Ganz herzlichen Dank für meine gesunden Arme!!!!",
  }
]

  const renderStars = (count) => {
    return Array(count)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className="text-yellow-500 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="w-full">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-black text-center text-2xl leading-none max-w-2xl mx-auto mb-12">
          Bewertungen bei Google
        </h2>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 relative">
          {reviewers.map((review, index) => (
            <div
              key={index}
              className="rounded-sm bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three dark:hover:shadow-gray-dark lg:px-5 xl:px-8"
            >
              <p className="font-bold uppercase">{review.name}</p>
              <p className="text-xs text-muted-foreground">{review.date}</p>
              <p className="text-sl text-muted-foreground font-light text-gray-700 mt-4">
                {review.comment}
              </p>
              <div className="flex items-center justify-center space-x-2 mt-4">
                {renderStars(review.rating)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center flex-1 p-6">
          <Link href={"https://g.co/kgs/hpMMftt"}>
            <button
              type="button"
              className="self-start bg-amber-950 w-40 h-11 rounded-sm text-yellow-50"
            >
              Alle Bewertungen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}