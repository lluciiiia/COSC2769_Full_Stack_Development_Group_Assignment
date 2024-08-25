type GroupCreationRequestType = {
  name: string;
  imgUrl: string;
  requestPerson: string;
  description: string;
  requestDate: string;
};

const GroupCreationRequest = ({
  name,
  imgUrl,
  requestPerson,
  description,
  requestDate,
}: GroupCreationRequestType) => {
  return (
    <div className="rounded-md bg-[#FFEEA8] p-2">
      <p className="absolute right-3 mr-2">
        <span className="opacity-60">Requested Date </span>
        {requestDate}
      </p>
      <div className="flex items-center gap-2">
        <img src={imgUrl} className="h-10 w-10 rounded-full object-cover"></img>
        <div>
          <p>{name}</p>
          <p className="ml-6">
            <span className="opacity-60">Requested by </span>
            <span className="cursor-pointer hover:underline">
              @{requestPerson}
            </span>
          </p>
        </div>
      </div>
      <div className="px-8 pt-4">{description}</div>
      <div className="mr-1 flex justify-end gap-5">
        <button className="rounded-xl bg-[rgba(76,175,80,0.57)] px-3 py-1 text-sm">
          Approve
        </button>
        <button className="rounded-xl bg-[rgba(207,41,41,0.59)] px-3 py-1 text-sm">
          Approve
        </button>
      </div>
    </div>
  );
};

export default GroupCreationRequest;
