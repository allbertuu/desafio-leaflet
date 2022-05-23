import { database } from "../services/firebase";
import { ref, set } from "firebase/database";

import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { MapIcon } from '@heroicons/react/outline';
import { LocationMarkerIcon } from '@heroicons/react/solid';

import SuccessModal from '../components/SuccessModal';
import ErrorModal from "../components/ErrorModal";

interface LocalData {
  name: string,
  latitude: number,
  longitude: number
}

function Form() {

  const [localData, setLocalData] = useState<LocalData>({ name: '', latitude: 0, longitude: 0 });

  const [addIsSuccessful, setAddSuccessful] = useState(false);
  const [addIsCancelled, setAddIsCancelled] = useState(false);

  function resetInputs() {
    (document.getElementById('name') as HTMLInputElement).value = '';
    (document.getElementById('latitude') as HTMLInputElement).value = '';
    (document.getElementById('longitude') as HTMLInputElement).value = '';
  }

  function handleInputOnChange(e: ChangeEvent<HTMLInputElement>) {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    async function addLocalData() {
      await set(ref(database, `markers/${localData.name}`), localData)
        .then(() => {
          setAddSuccessful(true);
          resetInputs();
        })
        .catch(() => setAddIsCancelled(true));
    }

    addLocalData();
  }

  return (
    <>
      {addIsSuccessful &&
        <SuccessModal setAddSuccessful={setAddSuccessful} />
      }
      {addIsCancelled &&
        <ErrorModal setAddIsCancelled={setAddIsCancelled} />
      }

      <LocationMarkerIcon className="text-white h-16 mb-4" />

      <h1 className="text-3xl uppercase text-center">Bem-vindo!</h1>

      <h3 className="text-xl text-center mt-4">Cadastre um local</h3>
      <div className="my-5 mx-10">
        <div className="mt-5 md:mt-0 mx-auto max-w-sm shadow-xl">
          <form action="#" method="POST" onSubmit={e => handleSubmit(e)} autoComplete="off">
            <div className="shadow overflow-hidden rounded-lg">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-6">
                    <label htmlFor="name" className="block font-medium text-gray-700">
                      Nome do local
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={e => handleInputOnChange(e)}
                      className="mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full shadow-sm border-gray-300 rounded-md"
                      required
                      spellCheck={true}
                      pattern=".{4,}" title="Igual ou maior que 4 caracteres."
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="latitude" className="block font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      type="text"
                      name="latitude"
                      id="latitude"
                      onChange={e => handleInputOnChange(e)}
                      className="mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full shadow-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="col-span-6">
                    <label htmlFor="longitude" className="block font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      type="text"
                      name="longitude"
                      id="longitude"
                      onChange={e => handleInputOnChange(e)}
                      className=" mt-1 focus:ring-slate-500 focus:border-slate-500 block w-full shadow-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>

                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                >
                  Cadastrar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Link to="/map" className="w-fit mx-auto text-lg hover:font-bold flex flex-col items-center">
        Ver mapa <MapIcon className="h-5 w-6" />
      </Link>
    </>
  );
}

export default Form;