const packageInformationDiv = document.getElementById("package-information");
const packageInformation = fetch("../package.json")
  .then(r => r.json())
  .then(package => {
    dependencyName = `<h1 class="text-6xl"><a href="../" >${package.name}</href></h1>`
    packageInformationDiv.insertAdjacentHTML('beforeend', dependencyName)
  })

const vulnerableDependenciesDiv = document.getElementById("vulnerable-dependencies");
const vulnerableDependencies = fetch("clj-watson.json")
  .then(r => r.json())
  .then(vulnerableDependencies => {
    vulnerableDependencies.map(vulnerableDependency => {
      
      cves = vulnerableDependency.vulnerabilities.map(vulnerability => vulnerability.advisory.identifiers[0].value)

    console.log(cves)
      vulnerableDependencyHTML = `
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
