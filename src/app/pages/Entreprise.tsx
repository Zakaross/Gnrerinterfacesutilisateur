import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
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

interface Exercice {
  id: string;
  annee: string;
  status: "en_cours" | "cloture" | "brouillon";
  nbEmployes: number;
  dateDebut: string;
  dateFin: string;
}

interface FichierID {
  id: string;
  nom: string;
  description: string;
  status: "importe" | "non_importe";
  dateImport?: string;
}

export default function Entreprise() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"exercices" | "salaries" | "fichiers" | "parametres">("exercices");
  const [searchTerm, setSearchTerm] = useState("");

  const [exercices] = useState<Exercice[]>([
    { id: "1", annee: "2026", status: "en_cours", nbEmployes: 45, dateDebut: "2026-01-01", dateFin: "2026-12-31" },
    { id: "2", annee: "2025", status: "cloture", nbEmployes: 42, dateDebut: "2025-01-01", dateFin: "2025-12-31" },
    { id: "3", annee: "2024", status: "cloture", nbEmployes: 38, dateDebut: "2024-01-01", dateFin: "2024-12-31" },
  ]);

  const [employees] = useState<Employee[]>([
    { id: "1", nom: "Dubois", prenom: "Marie", matricule: "EMP001", poste: "Développeur", dateEmbauche: "2023-01-15", status: "actif" },
    { id: "2", nom: "Martin", prenom: "Pierre", matricule: "EMP002", poste: "Chef de projet", dateEmbauche: "2022-06-10", status: "actif" },
    { id: "3", nom: "Bernard", prenom: "Sophie", matricule: "EMP003", poste: "Designer", dateEmbauche: "2023-09-01", status: "actif" },
    { id: "4", nom: "Thomas", prenom: "Luc", matricule: "EMP004", poste: "Comptable", dateEmbauche: "2021-03-20", status: "inactif" },
  ]);

  const [fichiersID, setFichiersID] = useState<FichierID[]>([
    { id: "ID19", nom: "ID19", description: "Revenus salariaux", status: "importe", dateImport: "2026-02-15" },
    { id: "ID20", nom: "ID20", description: "Cotisations sociales", status: "importe", dateImport: "2026-02-15" },
    { id: "ID21", nom: "ID21", description: "Prélèvements à la source", status: "non_importe" },
    { id: "ID22", nom: "ID22", description: "Avantages en nature", status: "non_importe" },
    { id: "ID23", nom: "ID23", description: "Indemnités et primes", status: "importe", dateImport: "2026-03-01" },
    { id: "ID24", nom: "ID24", description: "Heures supplémentaires", status: "non_importe" },
    { id: "ID25", nom: "ID25", description: "Frais professionnels", status: "non_importe" },
    { id: "ID26", nom: "ID26", description: "Autres revenus", status: "non_importe" },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    { label: "Exercice en cours", value: "2026", icon: Calendar, color: "blue" },
    { label: "Total Salariés", value: employees.filter(e => e.status === "actif").length, icon: Users, color: "green" },
    { label: "Fichiers exportés", value: "12", icon: FileText, color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 text-xl">TechCorp Solutions</h1>
                <p className="text-gray-500 text-sm">Espace Entreprise</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
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

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("exercices")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "exercices"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Calendar className="w-4 h-4 inline mr-2" />
            Exercices
          </button>
          <button
            onClick={() => setActiveTab("salaries")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "salaries"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Salariés
          </button>
          <button
            onClick={() => setActiveTab("fichiers")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "fichiers"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Fichiers DAS
          </button>
          <button
            onClick={() => setActiveTab("parametres")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "parametres"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Paramètres
          </button>
        </div>

        {/* Exercices Tab */}
        {activeTab === "exercices" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 text-xl">Gestion des Exercices</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-5 h-5" />
                Nouvel exercice
              </button>
            </div>
            <div className="space-y-4">
              {exercices.map((exercice, index) => (
                <motion.div
                  key={exercice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">Exercice {exercice.annee}</h3>
                        <p className="text-gray-500 text-sm">
                          {exercice.dateDebut} - {exercice.dateFin}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-gray-500 text-sm">Employés</p>
                        <p className="text-gray-900">{exercice.nbEmployes}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        exercice.status === "en_cours"
                          ? "bg-green-100 text-green-700"
                          : exercice.status === "cloture"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {exercice.status === "en_cours" ? "En cours" : exercice.status === "cloture" ? "Clôturé" : "Brouillon"}
                      </span>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Salaries Tab */}
        {activeTab === "salaries" && (
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
                              <span className="text-blue-600">
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

        {/* Fichiers Tab */}
        {activeTab === "fichiers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Actions globales */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 text-lg mb-1">Actions globales</h3>
                  <p className="text-gray-500 text-sm">Import/Export de tous les fichiers ID</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
                    <DownloadCloud className="w-5 h-5" />
                    Exporter tous les ID (PDF)
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg">
                    <DownloadCloud className="w-5 h-5" />
                    Exporter tous les ID (XML)
                  </button>
                </div>
              </div>
            </div>

            {/* Liste des fichiers ID */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-gray-900 text-xl">Gestion des Fichiers ID (ID19 - ID26)</h2>
                <p className="text-gray-500 text-sm mt-1">Fichiers DAS annuels de votre entreprise</p>
              </div>
              <div className="p-6">
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
                            fichier.status === "importe" ? "bg-green-100" : "bg-gray-100"
                          }`}>
                            <FileText className={`w-6 h-6 ${
                              fichier.status === "importe" ? "text-green-600" : "text-gray-400"
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-gray-900">{fichier.nom}</h3>
                              {fichier.status === "importe" ? (
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
                            </div>
                            <p className="text-gray-500 text-sm">{fichier.description}</p>
                            {fichier.dateImport && (
                              <p className="text-gray-400 text-xs mt-1">Importé le {fichier.dateImport}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                            <Upload className="w-4 h-4" />
                            Importer
                          </button>
                          <button
                            disabled={fichier.status !== "importe"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              fichier.status === "importe"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
                                : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            <Download className="w-4 h-4" />
                            Exporter PDF
                          </button>
                          <button
                            disabled={fichier.status !== "importe"}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                              fichier.status === "importe"
                                ? "bg-green-50 text-green-600 hover:bg-green-100"
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
            </div>

            {/* Templates */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-900 text-lg mb-1">Templates ID</h3>
                  <p className="text-gray-500 text-sm">Téléchargez les modèles vierges pour l'import</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
                  <Download className="w-5 h-5" />
                  Télécharger tous les templates
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Parametres Tab */}
        {activeTab === "parametres" && (
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
  );
}
