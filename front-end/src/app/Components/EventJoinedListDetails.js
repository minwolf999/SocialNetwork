"use client";

import { useRouter } from "next/navigation";

const EventJoinedListDetailsComponent = (eventJoined) => {
  const router = useRouter();

  const EVENT = eventJoined.eventJoined;

  const RedirectGroup = (groupId) => {
    router.push(`../group/${groupId}`);
  };

  return (
    <>
      {EVENT.length > 0 &&
        EVENT.map((event) => (
          <div
            key={event.Id}
            onClick={() => RedirectGroup(event.GroupId)}
            className="flex flex-col mt-4 bg-[#E6F4FF] justify-center mb-1 p-5 rounded-xl cursor-pointer max-w-sm text-justify"
          >
            <div className="flex text-xl justify-center font-bold font-roboto w-full">
              Titre : {event.Title}
            </div>
            <div className="flex justify-center font-roboto w-full">
              Description : {event.Description}
            </div>
            <div className="flex justify-center font-roboto w-full">
              <b>Date</b> : {event.DateOfTheEvent}
            </div>
          </div>
        ))}
    </>
  );
};

export default EventJoinedListDetailsComponent;
