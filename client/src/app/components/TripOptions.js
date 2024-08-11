import React, { useState } from "react";

const TripOptions = ({activityForm, handleActivitryForm }) => {
  const budgetOptions = [
    { label: "Cheap", description: "Stay conscious of costs", icon: "💵" },
    {
      label: "Moderate",
      description: "Keep cost on the average side",
      icon: "💰",
    },
    { label: "Luxury", description: "Don't worry about cost", icon: "💸" },
  ];

  const peopleOptions = [
    { text: "Just me", icon: "✈️" },
    { text: "A couple", icon: "🥂" },
    { text: "Family", icon: "🏠" },
    { text: "Friends", icon: "⛵" }
  ];

  return (
    <>
      <div className="p-6">
        <h2 className="text-lg leading-5  mb-4">What is Your Budget?</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
          { budgetOptions.map((item, index) => (
            <div
              key={ index }
              className={ ` shadow-md  rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer border ${activityForm.budget === item.label
                  ? "bg-blue-100 text-gray-500"
                  : ""
                }` }
              onClick={ () => handleActivitryForm({ key: 'budget', value: item.label }) }
            >
              <div className="text-xl mb-2">{ item.icon }</div>
              <h3 className="text-md font-medium">{ item.label }</h3>
              <p className="">{ item.description }</p>
            </div>
          )) }
        </div>

        {/* <h2 className="text-lg leading-5  mt-8 mb-4">
          Tell us your travel partner?
        </h2>
        <div className="flex flex-col px-4 py-4 mb-4 border-slate-600 border rounded-lg shadow-sm ">
          <div className="group flex-1">
            { peopleOptions.map(({ text, icon }) => (
              <p
                key={ text }
                className={ `text-sm w-full font-bold leading-normal tracking-[0.015em] flex h-11 items-center justify-center truncate px-4 text-center
                    ${activityForm.nPeople === text ? "text-white bg-slate-400" : ""}` }
                onClick={ () => handleActivitryForm({ key: 'nPeople', value: text }) }
              >
                <span className="mr-2">{ icon }</span>
                <span>{ text }</span>
              </p>
            )) }
          </div>
        </div> */}
      </div>
    </>
  );
};

export default TripOptions;
