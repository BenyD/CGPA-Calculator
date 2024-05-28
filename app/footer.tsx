// app/footer.tsx
const Footer = () => (
    <footer className="mt-8 p-4 border-t flex justify-between items-center w-full">
      <p className="text-center">© 2024 Beny Dishon. All rights reserved.</p>
      <div className="flex space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557a9.916 9.916 0 01-2.828.775 4.944 4.944 0 002.165-2.724 9.897 9.897 0 01-3.127 1.195 4.929 4.929 0 00-8.394 4.49A13.978 13.978 0 011.671 3.15 4.917 4.917 0 003.149 9.72a4.9 4.9 0 01-2.231-.617c-.054 2.288 1.581 4.415 3.95 4.89a4.935 4.935 0 01-2.224.084 4.935 4.935 0 004.605 3.42 9.874 9.874 0 01-7.293 2.031 13.94 13.94 0 007.547 2.209c9.056 0 14.009-7.506 14.009-14.009 0-.213-.004-.425-.014-.636A10.025 10.025 0 0024 4.557z" />
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.29c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.29h-3v-5.59c0-1.34-.02-3.07-1.87-3.07-1.88 0-2.17 1.46-2.17 2.97v5.69h-3v-10h2.88v1.36h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.58v5.6z" />
          </svg>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.11.82-.258.82-.577v-2.217c-3.338.727-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.082-.729.082-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.998.108-.774.418-1.304.761-1.604-2.665-.303-5.466-1.333-5.466-5.933 0-1.311.469-2.382 1.236-3.222-.124-.303-.536-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.96-.267 1.988-.4 3.008-.404 1.02.004 2.048.137 3.008.404 2.291-1.552 3.299-1.23 3.299-1.23.654 1.649.242 2.873.118 3.176.769.84 1.236 1.911 1.236 3.222 0 4.609-2.803 5.625-5.473 5.921.43.37.823 1.102.823 2.222v3.293c0 .321.217.694.826.576C20.566 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>
    </footer>
  )
  
  export default Footer