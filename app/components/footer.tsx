'use client'


import { Typography } from "@material-tailwind/react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="flex w-full flex-row flex-wrap lg:py-4 lg:px-8 items-center justify-center gap-y-6 gap-x-12 py-6 text-center fixed bottom-0 bg-nav-red opacity-60">
          <Typography className="font-Montserrat text-footer-text-color">
            &copy; {currentYear} Pulken OÜ
          </Typography>
          <div className="flex flex-col items-start">
            <Typography  className="font-Montserrat block text-footer-text-color">
              sander.pukk@gmail.com
            </Typography>
            <Typography className="font-Montserrat block text-footer-text-color">
              elkenrain@gmail.com
            </Typography>
          </div>
        </footer>
      );
      
}