import React from "react";
import { useState, useEffect } from "react";
import GroupCreationRequest from "./GroupCreationRequest";

type GroupCreationRequestType = {
  id: number;
  name: string;
  imgUrl: string;
  requestPerson: string;
  description: string;
  requestDate: string;
};

const groupList = [
  {
    id: 1,
    name: "Tech Innovators",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "John Doe",
    description:
      "A group for tech enthusiasts to discuss the latest trends in technology, software development, and innovation.",
    requestDate: "2024-07-15",
  },
  {
    id: 2,
    name: "Creative Writers Hub",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Sarah Lee",
    description:
      "A community for aspiring and experienced writers to share their work, exchange feedback, and collaborate on creative projects.",
    requestDate: "2024-08-01",
  },
  {
    id: 3,
    name: "Fitness Enthusiasts",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Mike Johnson",
    description:
      "A group dedicated to fitness lovers. Share workout routines, diet plans, and tips to stay healthy and fit.",
    requestDate: "2024-07-25",
  },
  {
    id: 4,
    name: "Photography Lovers",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Emily Carter",
    description:
      "A platform for photographers of all levels to showcase their work, learn new techniques, and participate in photography challenges.",
    requestDate: "2024-07-30",
  },
  {
    id: 5,
    name: "Sustainable Living",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Alice Brown",
    description:
      "A community focused on promoting sustainable living practices, including eco-friendly products, recycling tips, and green energy solutions.",
    requestDate: "2024-08-05",
  },
  {
    id: 6,
    name: "Book Club",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Jane Smith",
    description:
      "A group for book lovers to read and discuss a wide variety of genres, from fiction to non-fiction.",
    requestDate: "2024-08-10",
  },
  {
    id: 7,
    name: "Travel Enthusiasts",
    imgUrl:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Robert Wilson",
    description:
      "A group for people who love to travel, share their experiences, and plan future trips together.",
    requestDate: "2024-07-20",
  },
];

export const GroupManagement = () => {
  const [groups, setGroups] = useState<GroupCreationRequestType[]>([]);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    const sortedGroups = [...groupList].sort((a, b) => {
      if (sortOption === "newest") {
        return (
          new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
        );
      } else {
        return (
          new Date(a.requestDate).getTime() - new Date(b.requestDate).getTime()
        );
      }
    });
    setGroups(sortedGroups);
  }, [sortOption]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="mt-4 p-2">
      <div className="mb-4 flex items-center justify-between">
        <div></div> {/* Empty div to take up space on the left */}
        <select
          value={sortOption}
          onChange={handleSortChange}
          className="rounded-md border px-4 py-2"
        >
          <option value="newest">Sort by Newest</option>
          <option value="oldest">Sort by Oldest</option>
        </select>
      </div>

      <div className="flex flex-col gap-4">
        {groups.map((gr) => {
          const { id, name, imgUrl, requestPerson, description, requestDate } =
            gr;

          return (
            <GroupCreationRequest
              key={id}
              name={name}
              imgUrl={imgUrl}
              requestPerson={requestPerson}
              description={description}
              requestDate={requestDate}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupManagement;
