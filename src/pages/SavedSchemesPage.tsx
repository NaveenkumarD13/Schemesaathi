import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bookmark,
  Trash2,
  ArrowRight,
  Percent,
  Landmark,
} from "lucide-react";

import type { MatchedScheme } from "../features/eligibility/data/matchSchemes";

import {
  getSavedSchemes,
  removeScheme,
} from "../features/savedSchemes/utils/savedSchemes";

import { toast } from "sonner";

const SavedSchemesPage = () => {
  const navigate = useNavigate();

  const [savedSchemes, setSavedSchemes] = useState<MatchedScheme[]>([]);

  useEffect(() => {
    setSavedSchemes(getSavedSchemes());
  }, []);

  const handleRemove = (id: number) => {
    removeScheme(id);

    const updatedSchemes = getSavedSchemes();

    setSavedSchemes(updatedSchemes);

    toast.success("Scheme removed successfully.");
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      {/* Header */}

      <div className="mb-12 text-center">

        <div className="mb-5 flex justify-center">

          <div className="rounded-full bg-green-100 p-5">

            <Bookmark
              size={42}
              className="text-green-600"
            />

          </div>

        </div>

        <h1 className="text-4xl font-bold text-slate-900">
          Saved Government Schemes
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Easily access your favourite government schemes anytime.
        </p>

      </div>

      {savedSchemes.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow">

          <Bookmark
            size={64}
            className="mx-auto mb-6 text-slate-400"
          />

          <h2 className="text-2xl font-bold text-slate-800">
            No Saved Schemes Yet
          </h2>

          <p className="mt-3 text-slate-600">
            Save your favourite government schemes and they'll appear here.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 lg:grid-cols-2">

          {savedSchemes.map((scheme) => (

            <div
              key={scheme.id}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

              <div className="flex items-start justify-between">

                <div>

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                    <Landmark size={16} />

                    {scheme.category}

                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {scheme.name}
                  </h2>

                </div>

                <div className="rounded-xl bg-green-600 px-3 py-2 text-white">

                  <div className="flex items-center gap-1">

                    <Percent size={16} />

                    {scheme.matchScore}%

                  </div>

                </div>

              </div>

              <p className="mt-6 text-slate-600">
                {scheme.benefits}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">

                <button
                  onClick={() =>
                    navigate(`/schemes/${scheme.id}`, {
                      state: {
                        scheme,
                      },
                    })
                  }
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
                >
                  View Details

                  <ArrowRight size={18} />

                </button>

                <button
                  onClick={() => handleRemove(scheme.id)}
                  className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 font-medium text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={18} />

                  Remove

                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default SavedSchemesPage;