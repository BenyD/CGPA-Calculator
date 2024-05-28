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
  <footer className="mt-8 p-4 border-t flex justify-between items-center w-full">
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          href="https://your-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center cursor-pointer"
        >
          © 2024{" "}
          <span className="font-semibold text-gray-800 dark:text-blue-300 hover:text-gray-600 dark:hover:text-blue-100 hover:underline transition-colors duration-200">
            Beny Dishon
          </span>
          . All rights reserved.
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <Avatar>
            <AvatarImage
              src="https://github.com/beny-dishon.png"
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
    <div className="flex space-x-4">
      <a
        href="mailto:your-email@example.com"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={mailIcon} className="w-6 h-6" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={twitterIcon} className="w-6 h-6" />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <Icon icon={linkedinIcon} className="w-6 h-6" />
      </a>
      <a
        href="https://github.com"
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
