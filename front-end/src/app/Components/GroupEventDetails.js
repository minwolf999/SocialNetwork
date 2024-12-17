"use client";

import { FetchDeclineEvent, FetchJoinEvent } from "../Utils/fetchEventRequest";

const GroupEventDetailComponent = ({
  setShowEventDetail,
  event,
  cookieValue,
}) => {
  const handleDeclineEvent = () => {
    FetchDeclineEvent(cookieValue, event);
    setShowEventDetail(false);
  };

  const handleJoinEvent = () => {
    FetchJoinEvent(cookieValue, event.Id);
    setShowEventDetail(false);
  };

  return (
    <div className="fixed z-10 inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[40vw] h-auto">
        <div className="flex items-center text-center align-middle mb-4 justify-around">
          <div></div>
          <div className="flex justify-center">
            <h2 className="text-3xl font-bold">
              Détails de l&apos;évènement 📆
            </h2>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowEventDetail(false);
            }}
            className="flex cursor-pointer"
          >
            <img src="/svg/ClosePost.svg" alt="Sparkles icon" />
          </button>
        </div>
        <div className="flex h-auto items-center">
          <div className="w-full">
            <div className="flex p-0.5">
              <strong>Event Detail:</strong>{" "}
              {event ? event.Description : "No details available"}
            </div>
            <div className="flex p-0.5 text-[#8aceff]">
              {event ? `${event.DateOfTheEvent} at ${"12:00"}` : ""}
            </div>
            <div className="flex mt-4">{/* {event.Description} */}</div>
            <div className="flex justify-end mt-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeclineEvent();
                }}
                className="w-24 h-12 bg-[#404f51] rounded-lg justify-center items-center inline-flex text-[#e7e9e9] text-lg font-normal font-roboto mr-2"
              >
                Décliner
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoinEvent();
                }}
                className="w-24 h-12 bg-[#0087e8] rounded-lg justify-center items-center inline-flex text-[#e7e9e9] text-lg font-normal font-roboto ml-2"
              >
                Participer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupEventDetailComponent;
