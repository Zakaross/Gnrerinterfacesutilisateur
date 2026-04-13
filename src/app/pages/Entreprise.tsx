import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  Users,
  Upload,
  Download,
  LogOut,
  Settings,
  BarChart3,
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  DownloadCloud,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  FileSpreadsheet,
  Database,
  FilePlus,
} from "lucide-react";

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  matricule: string;
  poste: string;
  dateEmbauche: string;
  status: "actif" | "inactif";
}

interface FichierID {
  id: string;
  nom: string;
  description: string;
  statusExcel: "importe" | "non_importe";
  statusSage: "importe" | "non_importe";
  dateImportExcel?: string;
  dateImportSage?: string;
  anomalies: number;
}

interface Anomalie {
  id: string;
  fichierID: string;
  type: "erreur" | "avertissement";
  ligne: number;
  description: string;
  corrigee: boolean;
}

export default function Entreprise() {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<"salaries" | "import-excel" | "import-sage" | "templates" | "parametres">("salaries");
  const [selectedIDGeneration, setSelectedIDGeneration] = useState<string>("ID19");
  const [exerciceMenuOpen, setExerciceMenuOpen] = useState(true);
  const [generationPDFMenuOpen, setGenerationPDFMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [employees] = useState<Employee[]>([
    { id: "1", nom: "Dubois", prenom: "Marie", matricule: "EMP001", poste: "Développeur", dateEmbauche: "2023-01-15", status: "actif" },
    { id: "2", nom: "Martin", prenom: "Pierre", matricule: "EMP002", poste: "Chef de projet", dateEmbauche: "2022-06-10", status: "actif" },
    { id: "3", nom: "Bernard", prenom: "Sophie", matricule: "EMP003", poste: "Designer", dateEmbauche: "2023-09-01", status: "actif" },
    { id: "4", nom: "Thomas", prenom: "Luc", matricule: "EMP004", poste: "Comptable", dateEmbauche: "2021-03-20", status: "inactif" },
  ]);

  const [fichiersID, setFichiersID] = useState<FichierID[]>([
    { id: "ID19", nom: "ID19", description: "Revenus salariaux", statusExcel: "importe", statusSage: "non_importe", dateImportExcel: "2026-02-15", anomalies: 0 },
    { id: "ID20", nom: "ID20", description: "Cotisations sociales", statusExcel: "importe", statusSage: "importe", dateImportExcel: "2026-02-15", dateImportSage: "2026-02-16", anomalies: 2 },
    { id: "ID21", nom: "ID21", description: "Prélèvements à la source", statusExcel: "non_importe", statusSage: "non_importe", anomalies: 0 },
    { id: "ID22", nom: "ID22", description: "Avantages en nature", statusExcel: "non_importe", statusSage: "non_importe", anomalies: 0 },
    { id: "ID23", nom: "ID23", description: "Indemnités et primes", statusExcel: "importe", statusSage: "non_importe", dateImportExcel: "2026-03-01", anomalies: 1 },
    { id: "ID24", nom: "ID24", description: "Heures supplémentaires", statusExcel: "non_importe", statusSage: "non_importe", anomalies: 0 },
    { id: "ID25", nom: "ID25", description: "Frais professionnels", statusExcel: "non_importe", statusSage: "non_importe", anomalies: 0 },
    { id: "ID26", nom: "ID26", description: "Autres revenus", statusExcel: "non_importe", statusSage: "non_importe", anomalies: 0 },
  ]);

  const [anomalies] = useState<Anomalie[]>([
    { id: "1", fichierID: "ID20", type: "erreur", ligne: 15, description: "Matricule manquant pour le salarié", corrigee: false },
    { id: "2", fichierID: "ID20", type: "avertissement", ligne: 28, description: "Montant incohérent détecté", corrigee: false },
    { id: "3", fichierID: "ID23", type: "erreur", ligne: 42, description: "Date invalide", corrigee: false },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    { label: "Exercice en cours", value: "2026", icon: Calendar, color: "blue" },
    { label: "Total Salariés", value: employees.filter(e => e.status === "actif").length, icon: Users, color: "green" },
    { label: "Fichiers importés", value: fichiersID.filter(f => f.statusExcel === "importe" || f.statusSage === "importe").length, icon: FileText, color: "indigo" },
    { label: "Anomalies", value: anomalies.filter(a => !a.corrigee).length, icon: AlertTriangle, color: "red" },
  ];

  const totalAnomalies = anomalies.filter(a => !a.corrigee).length;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">TechCorp</h1>
              <p className="text-gray-500 text-xs">Entreprise</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {/* Exercice Menu */}
          <div>
            <button
              onClick={() => setExerciceMenuOpen(!exerciceMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>Exercice</span>
              </div>
              {exerciceMenuOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {exerciceMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 mt-1 space-y-1 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveSection("salaries")}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === "salaries"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    Salariés
                  </button>
                  <button
                    onClick={() => setActiveSection("import-excel")}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === "import-excel"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    Import Excel ID
                  </button>
                  <button
                    onClick={() => setActiveSection("import-sage")}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === "import-sage"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Database className="w-4 h-4" />
                    Import Sage ID
                  </button>
                  <button
                    onClick={() => setActiveSection("templates")}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                      activeSection === "templates"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Télécharger Templates
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Generation PDF Menu */}
          <div>
            <button
              onClick={() => setGenerationPDFMenuOpen(!generationPDFMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <FilePlus className="w-5 h-5" />
                <span>Génération de PDF ID</span>
              </div>
              {generationPDFMenuOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            <AnimatePresence>
              {generationPDFMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 mt-1 space-y-1 overflow-hidden"
                >
                  {fichiersID.map((fichier) => (
                    <button
                      key={fichier.id}
                      onClick={() => setSelectedIDGeneration(fichier.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
                        selectedIDGeneration === fichier.id
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <FileText className="w-4 h-4" />
                      {fichier.nom}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Parametres */}
          <button
            onClick={() => setActiveSection("parametres")}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              activeSection === "parametres"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Paramètres</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-gray-900 text-2xl">TechCorp Solutions</h2>
              <p className="text-gray-500 text-sm">Gestion de vos DAS annuels</p>
            </div>
            {totalAnomalies > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{totalAnomalies} anomalie{totalAnomalies > 1 ? "s" : ""} détectée{totalAnomalies > 1 ? "s" : ""}</span>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-xl border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                    <p className="text-gray-900 text-3xl">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Salaries Section */}
          {activeSection === "salaries" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-gray-900 text-xl">Gestion des Salariés</h2>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    Ajouter un salarié
                  </button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un salarié..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-6 py-4 text-sm text-gray-500">Matricule</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-500">Nom & Prénom</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-500">Poste</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-500">Date d'embauche</th>
                      <th className="text-left px-6 py-4 text-sm text-gray-500">Statut</th>
                      <th className="text-right px-6 py-4 text-sm text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees
                      .filter(emp =>
                        emp.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        emp.prenom.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((employee, index) => (
                        <motion.tr
                          key={employee.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-gray-900">{employee.matricule}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-sm">
                                  {employee.prenom[0]}{employee.nom[0]}
                                </span>
                              </div>
                              <span className="text-gray-900">{employee.prenom} {employee.nom}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{employee.poste}</td>
                          <td className="px-6 py-4 text-gray-600">{employee.dateEmbauche}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                              employee.status === "actif"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                employee.status === "actif" ? "bg-green-600" : "bg-gray-600"
                              }`}></span>
                              {employee.status === "actif" ? "Actif" : "Inactif"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Import Excel Section */}
          {activeSection === "import-excel" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Export Global */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 text-lg mb-1">Export Global (Excel)</h3>
                    <p className="text-gray-500 text-sm">Exporter tous les fichiers ID importés via Excel en un seul clic</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
                      <DownloadCloud className="w-5 h-5" />
                      Exporter tous en PDF
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                      <DownloadCloud className="w-5 h-5" />
                      Exporter tous en XML
                    </button>
                  </div>
                </div>
              </div>

              {/* Import Excel Individuel */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-gray-900 text-xl mb-6">Import des Fichiers ID via Excel</h2>
                <div className="grid grid-cols-1 gap-4">
                  {fichiersID.map((fichier, index) => (
                    <motion.div
                      key={fichier.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            fichier.statusExcel === "importe" ? "bg-green-100" : "bg-gray-100"
                          }`}>
                            <FileSpreadsheet className={`w-6 h-6 ${
                              fichier.statusExcel === "importe" ? "text-green-600" : "text-gray-400"
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-gray-900">{fichier.nom}</h3>
                              {fichier.statusExcel === "importe" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Importé
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Non importé
                                </span>
                              )}
                              {fichier.anomalies > 0 && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  {fichier.anomalies} anomalie{fichier.anomalies > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-500 text-sm">{fichier.description}</p>
                            {fichier.dateImportExcel && (
                              <p className="text-gray-400 text-xs mt-1">Importé le {fichier.dateImportExcel}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Upload className="w-4 h-4" />
                            Importer Excel
                          </button>
                          <button
                            disabled={fichier.statusExcel !== "importe"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              fichier.statusExcel === "importe"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Download className="w-4 h-4" />
                            Exporter PDF
                          </button>
                          <button
                            disabled={fichier.statusExcel !== "importe"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              fichier.statusExcel === "importe"
                                ? "bg-blue-50 text-blue-600 hover:bg-blue-100"
                                : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Download className="w-4 h-4" />
                            Exporter XML
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Anomalies */}
              {anomalies.filter(a => !a.corrigee).length > 0 && (
                <div className="bg-white rounded-xl border border-red-200 p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <h3 className="text-gray-900 text-lg">Anomalies détectées</h3>
                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                      {anomalies.filter(a => !a.corrigee).length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {anomalies.filter(a => !a.corrigee).map((anomalie, index) => (
                      <motion.div
                        key={anomalie.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className={`p-4 rounded-lg border ${
                          anomalie.type === "erreur"
                            ? "bg-red-50 border-red-200"
                            : "bg-yellow-50 border-yellow-200"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                              anomalie.type === "erreur" ? "text-red-600" : "text-yellow-600"
                            }`} />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-gray-900">{anomalie.fichierID}</span>
                                <span className="text-gray-500 text-sm">Ligne {anomalie.ligne}</span>
                              </div>
                              <p className={`text-sm ${
                                anomalie.type === "erreur" ? "text-red-700" : "text-yellow-700"
                              }`}>
                                {anomalie.description}
                              </p>
                            </div>
                          </div>
                          <button className="px-3 py-1 bg-white text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-sm">
                            Corriger
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Import Sage Section */}
          {activeSection === "import-sage" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Export Global */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-gray-900 text-lg mb-1">Export Global (Sage)</h3>
                    <p className="text-gray-500 text-sm">Exporter tous les fichiers ID importés via Sage en un seul clic</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
                      <DownloadCloud className="w-5 h-5" />
                      Exporter tous en PDF
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                      <DownloadCloud className="w-5 h-5" />
                      Exporter tous en XML
                    </button>
                  </div>
                </div>
              </div>

              {/* Import Sage Individuel */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-gray-900 text-xl mb-6">Import des Fichiers ID via Sage</h2>
                <div className="grid grid-cols-1 gap-4">
                  {fichiersID.map((fichier, index) => (
                    <motion.div
                      key={fichier.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                            fichier.statusSage === "importe" ? "bg-purple-100" : "bg-gray-100"
                          }`}>
                            <Database className={`w-6 h-6 ${
                              fichier.statusSage === "importe" ? "text-purple-600" : "text-gray-400"
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-gray-900">{fichier.nom}</h3>
                              {fichier.statusSage === "importe" ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-100 text-purple-700 rounded-full text-xs">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Importé
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Non importé
                                </span>
                              )}
                              {fichier.anomalies > 0 && (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  {fichier.anomalies} anomalie{fichier.anomalies > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-500 text-sm">{fichier.description}</p>
                            {fichier.dateImportSage && (
                              <p className="text-gray-400 text-xs mt-1">Importé le {fichier.dateImportSage}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                            <Upload className="w-4 h-4" />
                            Importer Sage
                          </button>
                          <button
                            disabled={fichier.statusSage !== "importe"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              fichier.statusSage === "importe"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Download className="w-4 h-4" />
                            Exporter PDF
                          </button>
                          <button
                            disabled={fichier.statusSage !== "importe"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              fichier.statusSage === "importe"
                                ? "bg-purple-50 text-purple-600 hover:bg-purple-100"
                                : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Download className="w-4 h-4" />
                            Exporter XML
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}


          {/* Templates Section */}
          {activeSection === "templates" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="mb-6">
                <h2 className="text-gray-900 text-xl mb-2">Télécharger les Templates ID</h2>
                <p className="text-gray-500">Téléchargez les modèles vierges pour faciliter l'import de vos données</p>
              </div>

              <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <h3 className="text-gray-900 mb-1">Tous les templates (ID19 - ID26)</h3>
                  <p className="text-gray-600 text-sm">Archive ZIP contenant tous les modèles Excel et Sage</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <DownloadCloud className="w-5 h-5" />
                  Tout télécharger
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fichiersID.map((fichier, index) => (
                  <motion.div
                    key={fichier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="text-gray-900">{fichier.nom}</h3>
                          <p className="text-gray-500 text-sm">{fichier.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Template Excel">
                          <FileSpreadsheet className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Template Sage">
                          <Database className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Generation PDF Section */}
          {generationPDFMenuOpen && selectedIDGeneration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {(() => {
                const fichierSelectionne = fichiersID.find(f => f.id === selectedIDGeneration);
                if (!fichierSelectionne) return null;

                return (
                  <>
                    {/* En-tête du fichier */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                            <FilePlus className="w-8 h-8 text-blue-600" />
                          </div>
                          <div>
                            <h2 className="text-gray-900 text-2xl">{fichierSelectionne.nom}</h2>
                            <p className="text-gray-500">{fichierSelectionne.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {fichierSelectionne.statusExcel === "importe" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                              <CheckCircle2 className="w-4 h-4" />
                              Excel importé
                            </span>
                          )}
                          {fichierSelectionne.statusSage === "importe" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                              <CheckCircle2 className="w-4 h-4" />
                              Sage importé
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Statistiques */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-500 text-sm mb-1">Exercice</p>
                          <p className="text-gray-900 text-xl">2026</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-500 text-sm mb-1">Salariés concernés</p>
                          <p className="text-gray-900 text-xl">{employees.filter(e => e.status === "actif").length}</p>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-500 text-sm mb-1">Anomalies</p>
                          <p className={`text-xl ${fichierSelectionne.anomalies > 0 ? "text-red-600" : "text-green-600"}`}>
                            {fichierSelectionne.anomalies}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Aperçu des données */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-gray-900 text-lg mb-4">Aperçu des données</h3>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <span className="text-gray-600">Source des données</span>
                            <div className="flex gap-2">
                              {fichierSelectionne.statusExcel === "importe" && (
                                <span className="text-green-600">Excel</span>
                              )}
                              {fichierSelectionne.statusSage === "importe" && (
                                <span className="text-purple-600">Sage</span>
                              )}
                              {fichierSelectionne.statusExcel === "non_importe" && fichierSelectionne.statusSage === "non_importe" && (
                                <span className="text-gray-400">Aucune donnée importée</span>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                            <span className="text-gray-600">Date de dernière importation</span>
                            <span className="text-gray-900">
                              {fichierSelectionne.dateImportExcel || fichierSelectionne.dateImportSage || "N/A"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Statut de validation</span>
                            {fichierSelectionne.anomalies === 0 ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                <CheckCircle2 className="w-4 h-4" />
                                Validé
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                                <AlertTriangle className="w-4 h-4" />
                                {fichierSelectionne.anomalies} anomalie{fichierSelectionne.anomalies > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions de génération */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-gray-900 text-lg mb-4">Générer le PDF officiel</h3>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <p className="text-gray-700 mb-4">
                          Vous êtes sur le point de générer le PDF officiel pour le fichier <strong>{fichierSelectionne.nom}</strong>.
                          Ce document sera conforme aux normes DAS pour l'exercice 2026.
                        </p>
                        {fichierSelectionne.anomalies > 0 && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-red-600" />
                              <span className="text-red-900">Attention : Des anomalies ont été détectées</span>
                            </div>
                            <p className="text-red-700 text-sm">
                              Il est recommandé de corriger les anomalies avant de générer le PDF officiel.
                            </p>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <button
                            disabled={fichierSelectionne.statusExcel === "non_importe" && fichierSelectionne.statusSage === "non_importe"}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all ${
                              fichierSelectionne.statusExcel === "non_importe" && fichierSelectionne.statusSage === "non_importe"
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                            }`}
                          >
                            <FilePlus className="w-5 h-5" />
                            Générer le PDF
                          </button>
                          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Aperçu
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          )}

          {/* Parametres Section */}
          {activeSection === "parametres" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-gray-900 text-xl mb-6">Paramètres</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nom de l'entreprise</label>
                  <input
                    type="text"
                    defaultValue="TechCorp Solutions"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Logo de l'entreprise</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Changer le logo
                    </button>
                  </div>
                  <p className="text-gray-500 text-sm mt-2">Format recommandé: PNG ou JPG, max 2MB</p>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
