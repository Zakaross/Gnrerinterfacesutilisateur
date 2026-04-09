import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Building2,
  Users,
  LogOut,
  Plus,
  Search,
  Edit,
  Trash2,
  Key,
  LayoutDashboard,
  UserCog,
} from "lucide-react";

interface User {
  id: string;
  nom: string;
  email: string;
  type: "entreprise" | "cabinet";
  dateCreation: string;
  status: "actif" | "inactif";
}

export default function SuperAdmin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"entreprises" | "cabinets" | "users">("entreprises");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [entreprises] = useState<User[]>([
    { id: "1", nom: "TechCorp Solutions", email: "contact@techcorp.fr", type: "entreprise", dateCreation: "2024-01-15", status: "actif" },
    { id: "2", nom: "Innovation Labs", email: "info@innovlabs.fr", type: "entreprise", dateCreation: "2024-02-20", status: "actif" },
    { id: "3", nom: "Digital Dynamics", email: "hello@digitaldyn.fr", type: "entreprise", dateCreation: "2023-11-10", status: "inactif" },
  ]);

  const [cabinets] = useState<User[]>([
    { id: "4", nom: "Cabinet Expertise Plus", email: "contact@expertiseplus.fr", type: "cabinet", dateCreation: "2024-03-05", status: "actif" },
    { id: "5", nom: "Conseil & Stratégie", email: "info@conseilstrat.fr", type: "cabinet", dateCreation: "2024-01-25", status: "actif" },
  ]);

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    { label: "Total Entreprises", value: entreprises.length, icon: Building2, color: "blue" },
    { label: "Total Cabinets", value: cabinets.length, icon: Users, color: "indigo" },
    { label: "Comptes Actifs", value: entreprises.filter(e => e.status === "actif").length + cabinets.filter(c => c.status === "actif").length, icon: UserCog, color: "green" },
  ];

  const displayedData = activeTab === "entreprises"
    ? entreprises.filter(e => e.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    : activeTab === "cabinets"
    ? cabinets.filter(c => c.nom.toLowerCase().includes(searchTerm.toLowerCase()))
    : [...entreprises, ...cabinets].filter(u => u.nom.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900 text-xl">Super Admin</h1>
                <p className="text-gray-500 text-sm">Gestion des structures et utilisateurs</p>
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

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white rounded-xl border border-gray-200"
        >
          {/* Tabs & Actions */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("entreprises")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "entreprises"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Building2 className="w-4 h-4 inline mr-2" />
                  Entreprises
                </button>
                <button
                  onClick={() => setActiveTab("cabinets")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "cabinets"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Cabinets
                </button>
                <button
                  onClick={() => setActiveTab("users")}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeTab === "users"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <UserCog className="w-4 h-4 inline mr-2" />
                  Tous les comptes
                </button>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ajouter
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-sm text-gray-500">Nom</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-500">Email</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-500">Type</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-500">Date création</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-500">Statut</th>
                  <th className="text-right px-6 py-4 text-sm text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedData.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          item.type === "entreprise" ? "bg-blue-100" : "bg-indigo-100"
                        }`}>
                          {item.type === "entreprise" ? (
                            <Building2 className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Users className="w-5 h-5 text-indigo-600" />
                          )}
                        </div>
                        <span className="text-gray-900">{item.nom}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        item.type === "entreprise"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}>
                        {item.type === "entreprise" ? "Entreprise" : "Cabinet"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{item.dateCreation}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${
                        item.status === "actif"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          item.status === "actif" ? "bg-green-600" : "bg-gray-600"
                        }`}></span>
                        {item.status === "actif" ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Key className="w-4 h-4" />
                        </button>
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
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl max-w-md w-full p-6"
          >
            <h3 className="text-gray-900 text-xl mb-4">Ajouter un compte</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Type de compte</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
                  <option value="entreprise">Entreprise</option>
                  <option value="cabinet">Cabinet</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="Nom de l'organisation"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="contact@exemple.fr"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mot de passe initial</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
