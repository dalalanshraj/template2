import { useEffect, useState } from "react";

import api from "../api/axios.js";

import { useModal } from "../context/ModalContext";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";


/* =========================================================
   SORTABLE PHOTO
========================================================= */

function SortablePhoto({
  photo,
  imageUrl,
  deletePhoto,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: photo.url,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        bg-white
        transition-all
        duration-200

        ${
          isDragging
            ? `
              border-blue-500
              shadow-2xl
              scale-[1.03]
              rotate-[1deg]
            `
            : `
              border-gray-200
              shadow-sm
              hover:shadow-lg
            `
        }
      `}
    >
      {/* =====================================================
          IMAGE / DRAG AREA
      ===================================================== */}

      <div
        {...listeners}
        className="
          relative
          overflow-hidden
          cursor-grab
          active:cursor-grabbing
          touch-none
          select-none
        "
      >
        <img
          src={imageUrl || "/placeholder.png"}
          alt="listing"
          className="
            w-full
            h-40
            sm:h-48
            md:h-52
            object-cover
            select-none
            pointer-events-none
            transition-transform
            duration-500
            group-hover:scale-105
          "
          draggable={false}
        />

        {/* =================================================
            DARK OVERLAY
        ================================================= */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-transparent
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-opacity
            duration-300
            pointer-events-none
          "
        />

        {/* =================================================
            DRAG HANDLE
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-xl
            bg-black/50
            backdrop-blur-sm
            text-white
            opacity-100
            md:opacity-0
            md:group-hover:opacity-100
            transition-all
            duration-200
            pointer-events-none
          "
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 5h8M8 12h8M8 19h8"
            />

            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5h.01M5 12h.01M5 19h.01"
            />
          </svg>
        </div>

        {/* =================================================
            MOBILE DRAG TEXT
        ================================================= */}

        <div
          className="
            absolute
            bottom-3
            left-3
            px-2.5
            py-1
            rounded-lg
            bg-black/45
            backdrop-blur-sm
            text-white
            text-[10px]
            font-medium
            md:hidden
            pointer-events-none
          "
        >
          Hold & drag
        </div>

        {/* =================================================
            DELETE BUTTON
        ================================================= */}

        <button
          type="button"
          onPointerDown={(e) => {
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
            deletePhoto(photo);
          }}
          className="
            absolute
            top-3
            right-3
            z-50
            flex
            items-center
            justify-center
            w-9
            h-9
            rounded-xl
            bg-red-500/90
            backdrop-blur-sm
            text-white
            opacity-100
            md:opacity-0
            md:group-hover:opacity-100
            hover:bg-red-600
            hover:scale-105
            active:scale-95
            transition-all
            duration-200
            cursor-pointer
            touch-auto
          "
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6l12 12M18 6L6 18"
            />
          </svg>
        </button>
      </div>

      {/* =====================================================
          PHOTO FOOTER
      ===================================================== */}

      <div
        className="
          flex
          items-center
          justify-between
          gap-2
          px-3
          sm:px-4
          py-2.5
          sm:py-3
          bg-white
        "
      >
        <span className="text-[11px] sm:text-xs font-medium text-gray-500">
          Listing Photo
        </span>

        <span className="text-[10px] sm:text-[11px] text-gray-400">
          Drag to reorder
        </span>
      </div>
    </div>
  );
}


/* =========================================================
   PHOTOS TAB
========================================================= */

export default function PhotosTab({
  listingId,
  goNextTab,
}) {
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);

  const { showModal } = useModal();


  /* =========================================================
     DND SENSORS
  ========================================================= */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),

    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 180,
        tolerance: 8,
      },
    })
  );


  /* =========================================================
     IMAGE URL
  ========================================================= */

  const getImageUrl = (photo) => {
    const base =
      import.meta.env.VITE_API_URL || "";

    if (photo?.url) {
      return `${base}/${photo.url.replace(
        /^\//,
        ""
      )}`;
    }

    return "/placeholder.png";
  };


  /* =========================================================
     LOAD PHOTOS
  ========================================================= */

  useEffect(() => {
    if (!listingId) return;

    fetchPhotos();
  }, [listingId]);


  const fetchPhotos = async () => {
    try {
      const res = await api.get(
        `/listings/${listingId}`
      );

      setPhotos(res.data.photos || []);
    } catch (err) {
      console.log(err);
    }
  };


  /* =========================================================
     UPLOAD PHOTOS
  ========================================================= */

  const uploadPhotos = async (files) => {
    if (!files || files.length === 0) return;

    if (!listingId) {
      return showModal(
        "Create listing first"
      );
    }

    setUploading(true);

    const formData = new FormData();

    for (const file of files) {
      formData.append("photos", file);
    }

    try {
      const res = await api.put(
        `/listings/${listingId}/photos`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setPhotos(res.data.photos || []);

      showModal(
        "Photos uploaded successfully"
      );
    } catch (err) {
      console.log(err);

      showModal("Upload failed");
    } finally {
      setUploading(false);
    }
  };


  /* =========================================================
     DELETE PHOTO
  ========================================================= */

  const deletePhoto = async (photo) => {
    try {
      const filename =
        photo.url.split("/").pop();

      const res = await api.delete(
        `/listings/${listingId}/photos/${filename}`
      );

      setPhotos(res.data.photos || []);

      showModal("Photo deleted");
    } catch (err) {
      console.log(
        "DELETE ERROR:",
        err.response?.data || err
      );

      showModal("Delete failed");
    }
  };


  /* =========================================================
     DRAG & DROP REORDER
  ========================================================= */

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex = photos.findIndex(
      (p) => p.url === active.id
    );

    const newIndex = photos.findIndex(
      (p) => p.url === over.id
    );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }

    const updatedPhotos = arrayMove(
      photos,
      oldIndex,
      newIndex
    );

    const reordered =
      updatedPhotos.map(
        (photo, index) => ({
          ...photo,
          order: index,
        })
      );

    // Instant UI update
    setPhotos(reordered);

    try {
      await api.put(
        `/listings/${listingId}/photos/reorder`,
        {
          photos: reordered,
        }
      );
    } catch (err) {
      console.log(
        "REORDER ERROR:",
        err
      );

      // Restore server order
      fetchPhotos();

      showModal(
        "Could not save photo order"
      );
    }
  };


  /* =========================================================
     UI
  ========================================================= */

  return (
    <div
      className="
        w-full
        space-y-5
        sm:space-y-6
        pb-4
      "
    >

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between
          gap-3
        "
      >
        <div className="min-w-0">
          <h2
            className="
              text-lg
              sm:text-xl
              font-bold
              text-gray-800
            "
          >
            Property Photos
          </h2>

          <p
            className="
              text-xs
              sm:text-sm
              text-gray-500
              mt-1
              leading-5
            "
          >
            Upload and arrange your property photos.
          </p>
        </div>

        <div
          className="
            px-3
            py-1.5
            rounded-full
            bg-blue-50
            border
            border-blue-100
            text-blue-700
            text-xs
            sm:text-sm
            font-medium
            w-fit
          "
        >
          {photos.length}{" "}
          {photos.length === 1
            ? "Photo"
            : "Photos"}
        </div>
      </div>


      {/* =====================================================
          MOBILE DRAG INSTRUCTION
      ===================================================== */}

      {photos.length > 1 && (
        <div
          className="
            md:hidden
            flex
            items-start
            gap-2
            px-3
            py-2.5
            rounded-xl
            bg-blue-50
            border
            border-blue-100
            text-blue-700
          "
        >
          <span className="text-sm">
            ☝️
          </span>

          <p className="text-xs leading-5">
            Press and hold a photo, then drag it
            up, down, left or right to change its
            position.
          </p>
        </div>
      )}


      {/* =====================================================
          UPLOAD CARD
      ===================================================== */}

      <div
        className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          p-3
          sm:p-5
          shadow-sm
        "
      >
        <label
          className="
            group
            relative
            flex
            flex-col
            items-center
            justify-center
            min-h-[170px]
            sm:min-h-[190px]
            rounded-xl
            sm:rounded-2xl
            border-2
            border-dashed
            border-gray-300
            bg-gray-50/50
            hover:border-blue-400
            hover:bg-blue-50/30
            transition-all
            duration-200
            cursor-pointer
          "
        >

          {/* Upload Icon */}

          <div
            className="
              flex
              items-center
              justify-center
              w-12
              h-12
              sm:w-14
              sm:h-14
              rounded-2xl
              bg-blue-100
              text-blue-600
              mb-3
              sm:mb-4
              group-hover:scale-110
              transition-transform
              duration-200
            "
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0L7 9m5-5l5 5"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 14v4a2 2 0 002 2h10a2 2 0 002-2v-4"
              />
            </svg>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-gray-700">
            Click to upload photos
          </p>

          <p className="text-[11px] sm:text-xs text-gray-400 mt-1 text-center px-3">
            JPG, PNG, WEBP or other image formats
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              uploadPhotos(e.target.files)
            }
            className="hidden"
          />
        </label>


        {/* Upload Status */}

        {uploading && (
          <div
            className="
              flex
              items-center
              gap-3
              mt-4
              px-3
              sm:px-4
              py-3
              rounded-xl
              bg-blue-50
              border
              border-blue-100
            "
          >
            <div
              className="
                w-4
                h-4
                shrink-0
                border-2
                border-blue-200
                border-t-blue-600
                rounded-full
                animate-spin
              "
            />

            <span className="text-xs sm:text-sm font-medium text-blue-700">
              Uploading photos...
            </span>
          </div>
        )}
      </div>


      {/* =====================================================
          PHOTO GRID
      ===================================================== */}

      {photos.length > 0 ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={photos.map(
              (p) => p.url
            )}
            strategy={rectSortingStrategy}
          >
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-3
                sm:gap-5
              "
            >
              {photos.map(
                (photo, index) => (
                  <SortablePhoto
                    key={
                      photo.url || index
                    }
                    photo={photo}
                    imageUrl={getImageUrl(
                      photo
                    )}
                    deletePhoto={
                      deletePhoto
                    }
                  />
                )
              )}
            </div>
          </SortableContext>
        </DndContext>
      ) : (

        /* ===================================================
           EMPTY STATE
        =================================================== */

        <div
          className="
            flex
            flex-col
            items-center
            justify-center
            py-12
            sm:py-16
            px-4
            bg-white
            border
            border-gray-200
            rounded-2xl
          "
        >
          <div
            className="
              flex
              items-center
              justify-center
              w-14
              h-14
              sm:w-16
              sm:h-16
              rounded-2xl
              bg-gray-100
              text-gray-400
              mb-4
            "
          >
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="2"
              />

              <circle
                cx="8.5"
                cy="8.5"
                r="1.5"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15l-5-5L5 21"
              />
            </svg>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-gray-700 text-center">
            No photos uploaded yet
          </h3>

          <p className="text-xs sm:text-sm text-gray-400 mt-1 text-center">
            Upload property photos to get started.
          </p>
        </div>
      )}


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          flex
          justify-end
          pt-4
          border-t
          border-gray-200
        "
      >
        <button
          onClick={goNextTab}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            active:scale-[0.98]
            text-white
            font-medium
            w-full
            sm:w-auto
            px-7
            py-2.5
            rounded-xl
            shadow-sm
            hover:shadow-md
            transition-all
            duration-200
            cursor-pointer
          "
        >
          Next

          <span className="text-lg leading-none">
            →
          </span>
        </button>
      </div>

    </div>
  );
}