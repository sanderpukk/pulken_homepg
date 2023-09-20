'use client'

import { Typography } from "@material-tailwind/react";


export default function MainPage() {
    return (
        <div className="flex w-full h-[70vh] items-center justify-center">
            <div className="max-w-[70%] animate-slideIn">
                <Typography className="font-Maven-Pro  text-2xl md:text-5xl text-left text-title-color opacity-80">
                    Teie GIS vajadused,<br /> meie ruumilised lahendused
                </Typography>
                <br />
                <Typography className="font-Maven-Pro text-base md:text-xl text-left text-footer-text-color opacity-80">
                    Pakume GIS IT-alast arendust, nõustamist ning analüüsi.
                </Typography>
            </div>
        </div>
    );
}