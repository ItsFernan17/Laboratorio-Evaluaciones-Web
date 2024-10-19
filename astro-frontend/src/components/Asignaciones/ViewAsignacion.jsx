import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  FaEdit,
  FaTrashAlt,
  FaSearch,
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { NewAsignacion } from "./NewAsigancion";
import { desactiveAsignacion } from './Asignaciones.api'

export function ViewAsignacion() {
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedAsignacion, setSelectedAsignacion] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const fetchAsignaciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/asignacion");
      const asignaciones = await response.json();
      setData(asignaciones);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAsignaciones(); // Cargar las asignaciones al montar el componente
  }, []);

  const filteredData = data.filter((item) =>
    item.evaluado.toString().includes(filterText)
  );

  const handleSelectedRowsChange = ({ selectedRows }) => {
    if (selectedRows.length > 0) {
      setSelectedAsignacion(selectedRows[0]);
    } else {
      setSelectedAsignacion(null);
    }
  };

  const handleEditClick = () => {
    if (selectedAsignacion) {
      setModalIsOpen(true); // Abrir modal de edición
    }
  };

  const handleDeleteClick = async () => {
    if (selectedAsignacion) {
      await desactiveAsignacion(selectedAsignacion.codigo_asignacion);
      setDeleteModalIsOpen(false);
      setSelectedAsignacion(null);
      fetchAsignaciones();
    }
  };

  const handleSaveAndRedirect = (codigoExamen, codigoAsignacion) => {
    if (codigoExamen && codigoAsignacion) {
      // Guardar el código del examen y el código de asignación en localStorage
      localStorage.setItem("codigo_examen", codigoExamen);
      localStorage.setItem("codigo_asignacion", codigoAsignacion);

      // Redirigir a la página de evaluación
      window.location.href = `/portal/examen/evaluacion`;
    } else {
      alert("Código de examen o asignación no válido");
    }
  };


  const exportToExcel = () => {
    if (filteredData.length > 0) {
      const exportData = filteredData.map(
        ({
          evaluado,
          examen,
          punteo,
        }) => ({
          Evaluado: evaluado?.nombre_completo || evaluado || "",
          Examen: examen?.motivo_examen.nombre_motivo || examen || "",
          "Tipo de Examen": examen?.tipo_examen.description || examen || "",
          Punteo: punteo ? `${punteo}` : "No evaluado",

        })
      );
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Asignaciones");
      XLSX.writeFile(workbook, "asignaciones.xlsx");
    } else {
      alert("No hay datos para exportar");
    }
  };

  const exportToPDF = () => {
    if (filteredData.length > 0) {
      const exportData = filteredData.map(
        ({
          evaluado,
          examen,
          punteo,
        }) => [
            evaluado?.nombre_completo || evaluado || "",
            examen?.motivo_examen.nombre_motivo || examen || "",
            examen?.tipo_examen.description  || examen || "",
            punteo ? `${punteo}` : "No evaluado",
          ]
      );
      const doc = new jsPDF();
      doc.autoTable({
        head: [
          [
            "Evaluado",
            "Examen",
            "Tipo de Examen",
            "Punteo",
          ],
        ],
        body: exportData,
      });
      doc.save("asignaciones.pdf");
    } else {
      alert("No hay datos para exportar");
    }
  };


  const handleGeneratePDF = (asignacion) => {
    if (asignacion.punteo > 0) {
      const doc = new jsPDF();

      // Título principal
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text("Estado Mayor de la Defensa Nacional", 105, 30, { align: "center" });

      // Subtítulo
      doc.setFontSize(16);
      doc.setFont("helvetica", "semibold");
      doc.text("Dirección de Personal Del Estado Mayor de la Defensa Nacional", 105, 40, { align: "center" });

      // Dibujar cuadro alrededor de los datos (modificamos el tamaño para incluir todo)
      doc.setLineWidth(0.5);
      doc.rect(10, 50, 190, 170); // Aumentamos la altura del rectángulo

      // Sección Datos del Evaluado
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Datos del Evaluado", 15, 60);

      // Datos del Evaluado
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Nombre Completo: ${asignacion.evaluado.nombre_completo}`, 15, 70);
      doc.text(`DPI: ${asignacion.evaluado.dpi}`, 15, 80);
      doc.text(`Teléfono: ${asignacion.evaluado.telefono}`, 15, 90);
      doc.text(`Grado: ${asignacion.evaluado.grado}`, 15, 100);
      doc.text(`Población: ${asignacion.evaluado.poblacion}`, 15, 110);
      doc.text(`Residencia: ${asignacion.evaluado.residencia}`, 15, 120);
      doc.text(`Comando: ${asignacion.evaluado.comando}`, 15, 130);

      // Línea divisoria entre secciones
      doc.setLineWidth(0.2);
      doc.line(10, 135, 200, 135);

      // Sección Datos del Examen
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Datos del Examen", 15, 145);

      // Datos del Examen
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Código Examen: ${asignacion.examen.codigo_examen}`, 15, 155);
      doc.text(`Fecha de Evaluación: ${asignacion.examen.fecha_evaluacion}`, 15, 165);
      doc.text(`Punteo Máximo: ${asignacion.examen.punteo_maximo}`, 15, 175);
      doc.text(`Punteo Obtenido: ${asignacion.punteo}`, 15, 185);
      doc.text(`Motivo Examen: ${asignacion.examen.motivo_examen.nombre_motivo}`, 15, 195);
      doc.text(`Tipo de Examen: ${asignacion.examen.tipo_examen.description}`, 15, 205); // Aquí incluimos el tipo de examen

      // Guardar el PDF
      doc.save(`Constancia_Examen_${asignacion.evaluado.nombre_completo}.pdf`);
    } else {
      alert("Este examen no tiene punteo registrado.");
    }
  };

  const columns = [
    {
      name: "Evaluado",
      selector: (row) =>
        row.evaluado?.nombre_completo || row.evaluado || "", // Accede a la propiedad nombre_completo si existe
      sortable: true,
      className: "font-page",
    },
    {
      name: "Examen",
      selector: (row) => row.examen?.motivo_examen.nombre_motivo || row.examen || "", // Accede a la propiedad codigo_examen del examen
      sortable: true,
      className: "font-page",
    },
    {
      name: "Tipo de Examen",
      selector: (row) => row.examen?.tipo_examen.description || row.examen || "", // Accede a la propiedad codigo_examen del examen
      sortable: true,
      className: "font-page",
    },
    {
      name: "Punteo",
      selector: (row) => (row.punteo ? `${row.punteo}` : "No evaluado"), // Mostrar punteo o "No evaluado"
      sortable: true,
      className: "font-page",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <button
          onClick={() =>
            handleSaveAndRedirect(row.examen.codigo_examen, row.codigo_asignacion)
          }
          disabled={row.punteo > 0} // Deshabilitar el botón si el punteo es mayor a 0
          className={`${
            row.punteo > 0
              ? " text-gray-700 cursor-not-allowed"
              : " text-[#0f763d] "
          } px-4 py-2 rounded`}
        >
          Ir al Examen
        </button>
      ),
      ignoreRowClick: true,
    },
    {
      name: "Certificacion",
      cell: (row) => (
        <button
          onClick={() => handleGeneratePDF(row)}
          disabled={row.punteo <= 0}
          className={`${
            row.punteo > 0
              ? "text-[#0f763d] "
              : "text-gray-700 cursor-not-allowed"
          } px-4 py-2 rounded`}
        >
          Generar PDF
        </button>
      ),
    },
  ];

  if (loading) return <div className="text-center font-page">Cargando...</div>;

  return (
    <div className="w-full p-5">
      <div className="flex mb-4 items-center relative w-[600px]">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="border bg-[#F7FAFF] p-2 pl-10 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300 font-page"
            placeholder="Buscar asignación..."
          />
        </div>

        <div className="flex ml-4 items-center translate-x-[550px] space-x-3">
          <span className="font-page font-semibold text-[16px] text-primary">
            Exportar en:
          </span>

          <button
            className="bg-[#0f763d] text-white border border-[#0f763d] p-2 rounded flex justify-center items-center"
            onClick={exportToExcel}
          >
            <FaFileExcel className="size-5" />
          </button>

          <button
            className="bg-[#da1618] text-white p-2 rounded flex justify-center items-center"
            onClick={exportToPDF}
          >
            <FaFilePdf className="size-5" />
          </button>
        </div>
      </div>
      

      {selectedAsignacion && (
  <div className="flex items-center bg-primary text-white p-2 rounded-md mb-4">
    <span className="mr-4 font-page ml-7">
      Seleccionado: {selectedAsignacion.evaluado.nombre_completo}
    </span>
    <button
      onClick={handleEditClick}
      className="flex items-center text-primary bg-[#FFFFFF] px-4 py-2 ml-[760px] rounded-[10px] mr-2"
    >
      <FaEdit className="size-5" />
    </button>
    <button
      onClick={() => setDeleteModalIsOpen(true)}
      className="flex items-center text-primary bg-[#ED8080] px-4 py-2 rounded-[10px]"
    >
      <FaTrashAlt className="size-5" />
    </button>
  </div>
)}

      {/* Tabla de asignaciones */}
      <div className="relative z-10">
        <DataTable
          columns={columns}
          data={filteredData}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5]}
          highlightOnHover
          noDataComponent={<div className="font-page">No hay registros</div>}
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          paginationComponentOptions={{
            rowsPerPageText: "Mostrando",
            rangeSeparatorText: "de",
          }}
          selectableRowsSingle
          customStyles={{
            headCells: {
              style: {
                color: "#142957",
                fontSize: "14px",
                fontWeight: "bold",
                textAlign: "center",
              },
            },
            rows: {
              style: {
                backgroundColor: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#E7EBF8 !important",
                },
                minHeight: "48px",
              },
            },
            cells: {
              style: {
                paddingLeft: "10px",
                paddingRight: "10px",
                fontSize: "14px",
                color: "#142957",
              },
            },
            pagination: {
              style: {
                backgroundColor: "none",
                padding: "10px",
                fontSize: "14px !important",
                color: "#142957 !important",
                fontWeight: "bold",
                height: "30px",
                display: "flex",
                justifyContent: "flex-start",
                border: "none",
                boxShadow: "none",
              },
              pageButtonsStyle: {
                fontSize: "14px !important",
                fontWeight: "bold",
                border: "3px Solid #142957",
                backgroundColor: "#142957",
                borderRadius: "15px",
                padding: "5px",
                margin: "0px 2px",
                fill: "#FFFFFF !important",
              },
            },
          }}
        />
      </div>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-[700px] rounded-lg shadow-lg">
            <div className="w-full flex items-center justify-between bg-primary text-white py-3 px-5 rounded-t-md">
              <h2 className="font-page font-semibold items-center text-[25px]">
                Actualizar Asignación
              </h2>
              <img src="/EMDN1.png" alt="Logo" className="h-14" />
            </div>

            <div className="px-6">
              <NewAsignacion
                codigo_asignacion={selectedAsignacion.codigo_asignacion}
                onClose={() => setModalIsOpen(false)}
                onUserSaved={fetchAsignaciones}
              />
            </div>
          </div>
        </div>
      )}

      {deleteModalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white w-[500px] rounded-lg shadow-lg">
            <div className="w-full flex items-center justify-between bg-primary text-white py-3 px-5 rounded-t-md">
              <h2 className="font-page font-semibold items-center text-[25px]">
                Confirmación de Eliminación
              </h2>
              <img src="/EMDN1.png" alt="Logo" className="h-14" />
            </div>
            <div className="px-6 py-4 text-center">
              <p className="text-lg mb-4">
                ¿Estás seguro de eliminar esta asignación?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeleteClick}
                  className="bg-[#ED8080] text-[#090000] px-4 py-2 rounded-md shadow transition duration-300 ease-in-out border hover:bg-white hover:text-[#090000] hover:border-[#ED8080]"
                >
                  Eliminar
                </button>
                <button
                  onClick={() => {
                    setDeleteModalIsOpen(false);
                    setSelectedAsignacion(null);
                  }}
                  className="bg-primary text-white px-4 py-2 rounded-md shadow transition duration-300 ease-in-out border hover:bg-white hover:text-primary hover:border-primary"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}