import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  FolderOpen,
  Users,
  Upload,
  Download,
  LogOut,
  Settings,
  Briefcase,
  Plus,
  Search,
  Edit,
  Trash2,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  DownloadCloud,
} from "lucide-react";

interface Client {
  id: string;
  nom: string;
  siret: string;
  nbSalaries: number;
  dateCreation: string;
  status: "actif" | "inactif";
}

interface Employee {
  id: string;
  nom: string;
  prenom: string;
  poste: string;
  dateEmbauche: string;
}

interface FichierID {
  id: string;
  nom: string;
  description: string;
  status: "importe" | "non_importe";
  dateImport?: string;
}

export default function Cabinet() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"clients" | "dossiers" | "salaries" | "parametres">("clients");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);

  const [clients] = useState<Client[]>([
    { id: "1", nom: "Restaurant Le Gourmet", siret: "123 456 789 00010", nbSalaries: 12, dateCreation: "2024-01-15", status: "actif" },
    { id: "2", nom: "Boutique Mode & Style", siret: "987 654 321 00020", nbSalaries: 8, dateCreation: "2024-02-10", status: "actif" },
    { id: "3", nom: "Garage Auto Pro", siret: "456 789 123 00030", nbSalaries: 15, dateCreation: "2023-11-20", status: "actif" },
    { id: "4", nom: "Salon Beauté Élégance", siret: "321 654 987 00040", nbSalaries: 6, dateCreation: "2024-03-05", status: "inactif" },
  ]);

  const [cabinetEmployees] = useState<Employee[]>([
    { id: "1", nom: "Dupont", prenom: "Jean", poste: "Expert-comptable", dateEmbauche: "2020-01-10" },
    { id: "2", nom: "Moreau", prenom: "Claire", poste: "Assistant comptable", dateEmbauche: "2021-05-15" },
    { id: "3", nom: "Lefebvre", prenom: "Marc", poste: "Consultant", dateEmbauche: "2022-09-01" },
  ]);

  const [fichiersID] = useState<FichierID[]>([
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
    { label: "Total Clients", value: clients.filter(c => c.status === "actif").length, icon: FolderOpen, color: "blue" },
    { label: "Collaborateurs", value: cabinetEmployees.length, icon: Users, color: "green" },
    { label: "Dossiers actifs", value: clients.filter(c => c.status === "actif").length, icon: Briefcase, color: "indigo" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 text-xl">Cabinet Expertise Plus</h1>
                <p className="text-gray-500 text-sm">Espace Cabinet</p>
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
            onClick={() => setActiveTab("clients")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "clients"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FolderOpen className="w-4 h-4 inline mr-2" />
            Mes Clients
          </button>
          <button
            onClick={() => setActiveTab("dossiers")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "dossiers"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Gestion des Dossiers
          </button>
          <button
            onClick={() => setActiveTab("salaries")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "salaries"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Collaborateurs
          </button>
          <button
            onClick={() => setActiveTab("parametres")}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === "parametres"
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-4 h-4 inline mr-2" />
            Paramètres
          </button>
        </div>

        {/* Clients Tab */}
        {activeTab === "clients" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-gray-900 text-xl">Gestion des Clients</h2>
                <button
                  onClick={() => setShowAddClientModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Nouveau client
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un client..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Nom du client</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-500">SIRET</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Nb. Salariés</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Date création</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Statut</th>
                    <th className="text-right px-6 py-4 text-sm text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients
                    .filter(client => client.nom.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((client, index) => (
                      <motion.tr
                        key={client.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                              <FolderOpen className="w-5 h-5 text-indigo-600" />
                            </div>
                            <span className="text-gray-900">{client.nom}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{client.siret}</td>
                        <td className="px-6 py-4 text-gray-600">{client.nbSalaries}</td>
                        <td className="px-6 py-4 text-gray-600">{client.dateCreation}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                            client.status === "actif"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              client.status === "actif" ? "bg-green-600" : "bg-gray-600"
                            }`}></span>
                            {client.status === "actif" ? "Actif" : "Inactif"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
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

        {/* Dossiers Tab */}
        {activeTab === "dossiers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {/* Client Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="block text-gray-700 mb-3">Sélectionner un client</label>
              <select
                value={selectedClient || ""}
                onChange={(e) => setSelectedClient(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              >
                <option value="">Choisir un client...</option>
                {clients.map(client => (
                  <option key={client.id} value={client.id}>{client.nom}</option>
                ))}
              </select>
            </div>

            {selectedClient && (
              <>
                {/* Actions globales */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 text-lg mb-1">Actions globales</h3>
                      <p className="text-gray-500 text-sm">
                        Import/Export de tous les fichiers ID pour {clients.find(c => c.id === selectedClient)?.nom}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
                        <DownloadCloud className="w-5 h-5" />
                        Exporter tous les ID (PDF)
                      </button>
                      <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
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
                    <p className="text-gray-500 text-sm mt-1">
                      Fichiers DAS annuels pour {clients.find(c => c.id === selectedClient)?.nom}
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-4">
                      {fichiersID.map((fichier, index) => (
                        <motion.div
                          key={fichier.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-sm transition-all"
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
                              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors">
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
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                      <Download className="w-5 h-5" />
                      Télécharger tous les templates
                    </button>
                  </div>
                </div>
              </>
            )}
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
                <h2 className="text-gray-900 text-xl">Collaborateurs du Cabinet</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  <Plus className="w-5 h-5" />
                  Ajouter un collaborateur
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Nom & Prénom</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Poste</th>
                    <th className="text-left px-6 py-4 text-sm text-gray-500">Date d'embauche</th>
                    <th className="text-right px-6 py-4 text-sm text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cabinetEmployees.map((employee, index) => (
                    <motion.tr
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                            <span className="text-indigo-600">
                              {employee.prenom[0]}{employee.nom[0]}
                            </span>
                          </div>
                          <span className="text-gray-900">{employee.prenom} {employee.nom}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{employee.poste}</td>
                      <td className="px-6 py-4 text-gray-600">{employee.dateEmbauche}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
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

        {/* Parametres Tab */}
        {activeTab === "parametres" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="text-gray-900 text-xl mb-6">Paramètres du Cabinet</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2">Nom du cabinet</label>
                <input
                  type="text"
                  defaultValue="Cabinet Expertise Plus"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Logo du cabinet</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Changer le logo
                  </button>
                </div>
                <p className="text-gray-500 text-sm mt-2">Format recommandé: PNG ou JPG, max 2MB</p>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Enregistrer les modifications
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
          >
            <h3 className="text-gray-900 text-xl mb-4">Nouveau Client</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Nom du client</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="Nom de l'entreprise"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">SIRET</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="XXX XXX XXX XXXXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nombre de salariés</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddClientModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Créer
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
