import { Icon } from "@iconify/react";
import twitterIcon from "@iconify-icons/mdi/twitter";
import linkedinIcon from "@iconify-icons/mdi/linkedin";
import githubIcon from "@iconify-icons/mdi/github";

const Footer = () => (
  <footer className="mt-8 p-4 border-t flex justify-between items-center w-full">
    <p className="text-center">© 2024 Beny Dishon. All rights reserved.</p>
    <div className="flex space-x-4">
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
