import { useState } from "react";
import GroupCreationRequest from "./GroupCreationRequest";

const groupList = [
  {
    id: 1,
    name: "Tech Innovators",
    imgURL:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "John Doe",
    description:
      "A group for tech enthusiasts to discuss the latest trends in technology, software development, and innovation.",
    requestDate: "2024-07-15",
  },
  {
    id: 2,
    name: "Creative Writers Hub",
    imgURL:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Sarah Lee",
    description:
      "A community for aspiring and experienced writers to share their work, exchange feedback, and collaborate on creative projects.",
    requestDate: "2024-08-01",
  },
  {
    id: 3,
    name: "Fitness Enthusiasts",
    imgURL:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Mike Johnson",
    description:
      "A group dedicated to fitness lovers. Share workout routines, diet plans, and tips to stay healthy and fit.",
    requestDate: "2024-07-25",
  },
  {
    id: 4,
    name: "Photography Lovers",
    imgURL:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Emily Carter",
    description:
      "A platform for photographers of all levels to showcase their work, learn new techniques, and participate in photography challenges.",
    requestDate: "2024-07-30",
  },
  {
    id: 5,
    name: "Sustainable Living",
    imgURL:
      "https://steamuserimages-a.akamaihd.net/ugc/1013818009148019610/187908C668F299A58F2E07A25874D7075CE5F17F/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    requestPerson: "Alice Brown",
    description:
      "A community focused on promoting sustainable living practices, including eco-friendly products, recycling tips, and green energy solutions.",
    requestDate: "2024-08-05",
  },
];

export const GroupManagement = () => {
  const [groups, setGroups] = useState(groupList);
  return (
    <div className="mt-4 flex flex-col gap-4 p-2">
      {groups.map((gr) => {
        const { name, imgURL, requestPerson, description, requestDate } = gr;

        return (
          <GroupCreationRequest
            name={name}
            imgUrl={imgURL}
            requestPerson={requestPerson}
            description={description}
            requestDate={requestDate}
          />
        );
      })}
    </div>
  );
};
