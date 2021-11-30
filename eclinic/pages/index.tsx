import React from "react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  title: string;
  image: string;
  url: string;
}

function Card(props: CardProps) {
  return (
    <Link href={props.url}>
      <a
        tabIndex={0}
        className="p-8 w-[160px] h-[160px] lg:w-52 lg:h-40 bg-white shadow-lg drop-shadow-sm rounded-xl flex justify-center items-center flex-col cursor-pointer transform transition-all duration-150 ease-linear hover:card-focused focus:card-focused"
      >
        <h2 className="text-gray-500 mb-2 text-sm uppercase text-center font-black">
          {props.title}
        </h2>
        <Image
          src={props.image}
          width={75}
          height={75}
          layout="fixed"
          alt={props.title}
          className="rounded-full bg-gray-100 "
        />
      </a>
    </Link>
  );
}

export default function Dashboard() {
  return (
    <div className="px-12 mx-auto py-3 bg-[#a1bbb0]">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center justify-center">
        <Card title="Patients" image="/icons/history.jpg" url="/patients" />
        <Card title="Laboratory" image="/icons/microscope.png" url="/laboratory" />
        <Card title="Radiology" image="/icons/heartbeat.png" url="/laboratory?dept=radiology" />
        <Card title="Pharmacy" image="/icons/pills.png" url="/pharmacy" />
        <Card title="Billing" image="/icons/payments.jpeg" url="/billing" />
        <Card title="Chat" image="/icons/visits.jpg" url="/chat" />
        <Card title="Inventory" image="/icons/clamp.png" url="/inventory/" />
        <Card title="Consumables" image="/icons/bandage.png" url="/consumables" />
        <Card title="User Accounts" image="/icons/badge.png" url="/users" />
      </div>
    </div>
  );
}
