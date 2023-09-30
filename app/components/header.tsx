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
        <Navbar className="mx-auto  md:w-9/12 py-2 px-4 md:px-8 md:py-4 rounded-none md:rounded-b-[30px] bg-nav-red border border-black relative z-20">
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