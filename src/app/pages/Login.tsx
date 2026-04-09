import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Building2, Users, Shield } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<"super-admin" | "entreprise" | "cabinet">("entreprise");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de connexion
    if (userType === "super-admin") {
      navigate("/super-admin");
    } else if (userType === "entreprise") {
      navigate("/entreprise");
    } else {
      navigate("/cabinet");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Hero */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="text-white text-5xl mb-4">
              Plateforme de Gestion
            </h1>
            <p className="text-blue-100 text-xl">
              Système intégré pour entreprises et cabinets
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 space-y-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg mb-1">Gestion des Exercices</h3>
              <p className="text-blue-200">Import et export des fichiers DAS annuels</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg mb-1">Gestion des Salariés</h3>
              <p className="text-blue-200">Administration complète des employés</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-white text-lg mb-1">Sécurité Avancée</h3>
              <p className="text-blue-200">Protection des données et authentification</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="mb-8">
            <h2 className="text-gray-900 text-3xl mb-2">Connexion</h2>
            <p className="text-gray-600">Accédez à votre espace de gestion</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* User Type Selection */}
            <div>
              <label className="block text-gray-700 mb-3">Type de compte</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("entreprise")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === "entreprise"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Building2 className={`w-6 h-6 mx-auto mb-2 ${
                    userType === "entreprise" ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-sm ${
                    userType === "entreprise" ? "text-blue-900" : "text-gray-600"
                  }`}>
                    Entreprise
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("cabinet")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === "cabinet"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Users className={`w-6 h-6 mx-auto mb-2 ${
                    userType === "cabinet" ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-sm ${
                    userType === "cabinet" ? "text-blue-900" : "text-gray-600"
                  }`}>
                    Cabinet
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("super-admin")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === "super-admin"
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <Shield className={`w-6 h-6 mx-auto mb-2 ${
                    userType === "super-admin" ? "text-blue-600" : "text-gray-400"
                  }`} />
                  <span className={`text-sm ${
                    userType === "super-admin" ? "text-blue-900" : "text-gray-600"
                  }`}>
                    Admin
                  </span>
                </button>
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="votre@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                Mot de passe oublié?
              </a>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Se connecter
            </motion.button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Besoin d'aide? <a href="#" className="text-blue-600 hover:text-blue-700">Contactez le support</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
