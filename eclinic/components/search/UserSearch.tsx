import { Dispatch, SetStateAction } from "react";

interface UserSearchProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

export default function UserSearch({ name, setName }: UserSearchProps) {
  return (
    <div className="z-50">
      <form className="hidden sm:block mx-2">
        <input
          type="search"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Seach patients by name"
          className="focus:border-red-500 focus:right-4 focus:ring-red-400"
        />
      </form>
    </div>
  );
}
