export default function Skills() {
    return (
      <section id="skills" className="py-16 bg-[#1a1a1a] text-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Programming Skills */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg mx-6 transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Programming</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Python</li>
                <li>Java</li>
                <li>C/C++</li>
                <li>SQL</li>
                <li>HTML, CSS, JavaScript</li>
                <li>React & Next.js</li>
              </ul>
            </div>

            {/* Mathematics Skills */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg mx-6 transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Mathematics</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Mathematica</li>
                <li>Maple</li>
                <li>FORTRAN</li>
                <li>MATLAB</li>
                <li>SageMath</li>
                <li>LaTeX</li>
              </ul>
            </div>
  
            {/* Data Analytics Skills */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg mx-6 transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Data Analytics</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Excel</li>
                <li>Power BI</li>
                <li>Tableau</li>
                <li>Python</li>
                <li>SAS</li>
                <li>R Programming</li>
              </ul>
            </div>
  
            {/* Cybersecurity Skills */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg mx-6 transition-transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Cybersecurity</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Network Security</li>
                <li>Web Security</li>
                <li>Cloud Security</li>
                <li>Penetration Testing</li>
                <li>Incident Response</li>
                <li>Security Operations</li>
              </ul>
            </div>
  
            
{/*   
            
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Tools & Technologies</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Git & GitHub</li>
                <li>Docker & Kubernetes</li>
                <li>AWS & Azure</li>
                <li>Linux & Shell Scripting</li>
                <li>JIRA & Agile Methodologies</li>
                <li>VSCode & IntelliJ</li>
              </ul>
            </div> 
*/}
          </div>
        </div>
      </section>
    );
  }
  