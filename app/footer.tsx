import { Icon } from "@iconify/react";
import twitterIcon from "@iconify-icons/mdi/twitter";
import linkedinIcon from "@iconify-icons/mdi/linkedin";
import githubIcon from "@iconify-icons/mdi/github";
import mailIcon from "@iconify-icons/mdi/email";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Footer = () => (
  <footer className="mt-8 p-4 border-t flex flex-col sm:flex-row justify-between items-center w-full">
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href="https://beny.one/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center cursor-pointer mb-4 sm:mb-0"
        >
          <p className="text-sm sm:text-base">
            © 2024{" "}
            <span className="font-semibold text-gray-800 dark:text-blue-300 hover:text-gray-600 dark:hover:text-blue-100 hover:underline transition-colors duration-200">
              Beny Dishon
            </span>
            . All rights reserved.
          </p>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage
              src="https://media.licdn.com/dms/image/D5603AQFj_Qtbn6tt8g/profile-displayphoto-shrink_400_400/0/1705775112790?e=1722470400&v=beta&t=FbMWjcHgT6Ys253-uM186CV-t9HrTdHofg3PVfir5fw"
              alt="Beny Dishon"
            />
            <AvatarFallback>BD</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Beny Dishon</h4>
            <p className="text-sm">
              Software Developer and Content Creator. Passionate about coding
              and sharing knowledge.
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
    <div className="flex flex-wrap justify-center space-x-4 sm:flex-nowrap">
      <a
        href="mailto:benydishon@gmail.com"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={mailIcon} className="w-6 h-6" />
      </a>
      <a
        href="https://x.com/benydishon"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={twitterIcon} className="w-6 h-6" />
      </a>
      <a
        href="https://www.linkedin.com/in/benydishon/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={linkedinIcon} className="w-6 h-6" />
      </a>
      <a
        href="https://github.com/BenyD"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={githubIcon} className="w-6 h-6" />
      </a>
    </div>
  </footer>
);

export default Footer;
