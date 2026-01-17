"use client";
import React from 'react'
import ConvoIcon from "../assets/images/CovoSvg.svg";
import Image from "next/image";
import Link from "next/link";

function ConvologoSmall() {
  return (
    <div className="fixed top-6 left-4 md:left-8 z-[1000] pointer-events-auto transition-transform hover:scale-105 duration-300">
        <Link href="/">
          <Image
            src={ConvoIcon}
            alt="convo logo"
            className="object-cover h-12 w-auto drop-shadow-xl"
          />
        </Link>
      </div>
  )
}

export default ConvologoSmall
