"use client";

import { useRouter } from "next/navigation";

const GroupMembersComponent = ({ groupMembers, searchTerm }) => {
  const router = useRouter();

  const handleProfileClick = (userId) => {
    router.push(`../profile/${userId}`);
  };

  return (
    <div className="self-stretch align-left gap-2 inline-flex p-">
      <div className="flex-col gap-3.5 inline-flex">
        {groupMembers &&
          groupMembers.length > 0 &&
          groupMembers.map(
            (member) =>
              (member.FirstName.toLowerCase().includes(
                searchTerm.toLowerCase()
              ) ||
                member.LastName.toLowerCase().includes(
                  searchTerm.toLowerCase()
                )) && (
                <button
                  onClick={() => handleProfileClick(member.Id)}
                  key={member.Id}
                  className="h-[19px] m-2 text-[#091314] text-base font-normal font-roboto flex justify-center items-center text-center"
                >
                  <img
                    className="w-12 h-12 rounded-[100px]"
                    src={member.ProfilePicture}
                    alt={`${member.FirstName}'s profile`}
                  />
                  <div className="flex flex-col suggestion-item p-2 text-black border-black">
                    {member.FirstName} {member.LastName}
                  </div>
                </button>
              )
          )}
      </div>
    </div>
  );
};

export default GroupMembersComponent;
