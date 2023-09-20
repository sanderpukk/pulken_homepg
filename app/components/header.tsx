'use client'

import React from "react";
import {
    Navbar,
    Typography,
} from "@material-tailwind/react";
import Image from 'next/image'
import pulkenLogo from '@/app/pulken_logo-svg-white.svg'

export default function NavbarDefault() {

    return (
        <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 rounded-none lg:rounded-b-[30px] bg-nav-red border border-black">
          <div className="container mx-auto flex items-center justify-between text-white">
            <div className="flex items-center">
              <Image
                src={pulkenLogo}
                alt="Logo"
                height={30}
                width={30}
                className="mr-4 cursor-pointer py-1.5 font-medium"
              />
              <Typography variant="h4" href="#" className="font-Maven-Pro cursor-pointer py-1.5 opacity-80">
                Pulken
              </Typography>
            </div>
          </div>
        </Navbar>
      );
      
      
}