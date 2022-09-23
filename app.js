const packageInformationDiv = document.getElementById("package-information");
if(packageInformationDiv){
  const packageInformation = fetch("../package.json")
  .then(r => r.json())
  .then(package => {
    dependencyName = `<h1 class="text-6xl"><a href="../" >${package.name}</href></h1>`
    packageInformationDiv.insertAdjacentHTML('beforeend', dependencyName)
  })
}

const vulnerableDependenciesDiv = document.getElementById("vulnerable-dependencies");
if (vulnerableDependenciesDiv){
  const vulnerableDependencies = fetch("clj-watson.json")
  .then(r => r.json())
  .then(vulnerableDependencies => {
    vulnerableDependencies.map(vulnerableDependency => {

      cves = vulnerableDependency.vulnerabilities.map(vulnerability => vulnerability.advisory.identifiers[0].value)

      const vulnerableDependencyHTML = `
<div class="border-solid border-4 border-sky-1000 p-3 mr-3 mb-3 shadow-md">
<p class="text-2xl">${vulnerableDependency.dependency} ${vulnerableDependency["mvn/version"]}</p>
<b>Secure Version:</b>
<p>${vulnerableDependency["secure-version"] || "No secure version available"}</p>
<b>Remediation suggestion:</b>
<p>${vulnerableDependency["remediate-suggestion"]}</p>
<b>Dependency tree:</b>
<p>${vulnerableDependency.parents}</p>
<b>CVE:</b>
<p>${cves}</p>
</div>
`
      vulnerableDependenciesDiv.insertAdjacentHTML('beforeend', vulnerableDependencyHTML);
    })
  })
}

const vulnerableCodeDiv = document.getElementById("vulnerable-code");
if (vulnerableCodeDiv){
  const vulnerableCode = fetch("clj-holmes.json")
  .then(r => r.json())
  .then(vulnerabilities => {
    vulnerabilities.map(vulnerability => {
      const vulnerabilityDescription = `
<p class="text-2xl">${vulnerability.filename}<p>
<p>${vulnerability.name}<p>
<p>${vulnerability.message}<p>
`
      vulnerableCodeDiv.insertAdjacentHTML('beforeend', vulnerabilityDescription);

      vulnerability.findings.map(finding => {
        const findingHTML = `
<div class="border-solid border-4 border-sky-1000 p-3 mr-3 mb-3 shadow-md">
<b>Parent:</b><p> ${finding.parent}</p>
<code class="bg-slate-500	text-white">
${finding.row}| ${finding.code}
</code>
<b>
</div>
`
        vulnerableCodeDiv.insertAdjacentHTML('beforeend', findingHTML);
      })
    })
  })
}
