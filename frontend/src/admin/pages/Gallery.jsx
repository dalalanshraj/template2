import { useEffect, useRef, useState } from "react";

import api from "../../api/axios";

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

import {
  FaCloudUploadAlt,
  FaGripVertical,
  FaTrash,
  FaImages,
  FaCheckCircle,
  FaEyeSlash,
} from "react-icons/fa";

import { MdDragIndicator } from "react-icons/md";


// ============================================================
// SORTABLE IMAGE CARD
// ============================================================

function SortableImage({
  img,
  imageUrl,
  toggle,
  remove,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: img._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : "auto",
  };

  const isPublished =
    img.status === "published";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`
        group
        relative
        bg-white
        rounded-2xl
        sm:rounded-3xl
        border
        overflow-hidden
        transition-all
        duration-300
        ${
          isDragging
            ? `
              border-blue-500
              shadow-2xl
              scale-[1.03]
              rotate-[1deg]
            `
            : `
              border-slate-200
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
            `
        }
      `}
    >

      {/* ======================================================
          IMAGE / DRAG AREA
      ======================================================= */}

      <div
        {...listeners}
        className="
          relative
          aspect-[4/3]
          bg-slate-100
          cursor-grab
          active:cursor-grabbing
          overflow-hidden
          touch-none
          select-none
        "
      >
        <img
          src={imageUrl}
          alt="Gallery"
          className="
            w-full
            h-full
            object-cover
            pointer-events-none
            select-none
            transition-transform
            duration-500
            group-hover:scale-105
          "
          draggable={false}
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-transparent
            to-transparent
            opacity-0
            md:group-hover:opacity-100
            transition-opacity
            duration-300
            pointer-events-none
          "
        />

        {/* ==================================================
            DRAG INDICATOR
        =================================================== */}

        <div
          className="
            absolute
            top-3
            left-3
            w-9
            h-9
            rounded-xl
            bg-black/50
            backdrop-blur-md
            text-white
            flex
            items-center
            justify-center
            opacity-100
            md:opacity-0
            md:group-hover:opacity-100
            transition
            pointer-events-none
          "
          title="Drag to reorder"
        >
          <FaGripVertical size={14} />
        </div>

        {/* MOBILE DRAG LABEL */}

        <div
          className="
            absolute
            bottom-3
            left-3
            md:hidden
            px-2.5
            py-1
            rounded-lg
            bg-black/50
            backdrop-blur-sm
            text-white
            text-[10px]
            font-semibold
            pointer-events-none
          "
        >
          Hold & drag
        </div>

        {/* ==================================================
            STATUS
        =================================================== */}

        <div className="absolute top-3 right-3">
          {isPublished ? (
            <span
              className="
                inline-flex
                items-center
                gap-1
                px-2
                sm:px-3
                py-1.5
                rounded-full
                bg-[#047edf]
                backdrop-blur-md
                text-white
                text-[10px]
                sm:text-[11px]
                font-bold
                shadow-lg
              "
            >
              <FaCheckCircle size={9} />

              <span>
                Published
              </span>
            </span>
          ) : (
            <span
              className="
                inline-flex
                items-center
                gap-1
                px-2
                sm:px-3
                py-1.5
                rounded-full
                bg-slate-800/75
                backdrop-blur-md
                text-white
                text-[10px]
                sm:text-[11px]
                font-bold
              "
            >
              <FaEyeSlash size={9} />

              <span>
                Hidden
              </span>
            </span>
          )}
        </div>
      </div>


      {/* ======================================================
          CARD FOOTER
      ======================================================= */}

      <div className="p-3 sm:p-4">

        <div className="flex items-center justify-between gap-3">

          {/* TOGGLE */}

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
              toggle(img._id);
            }}
            className="
              flex
              items-center
              gap-2
              text-xs
              sm:text-sm
              font-semibold
              text-slate-700
              hover:text-blue-600
              transition
              touch-auto
            "
          >
            <span
              className={`
                relative
                w-10
                h-5
                sm:w-11
                sm:h-6
                rounded-full
                transition
                ${
                  isPublished
                    ? "bg-emerald-500"
                    : "bg-slate-300"
                }
              `}
            >
              <span
                className={`
                  absolute
                  top-0.5
                  w-4
                  h-4
                  rounded-full
                  bg-white
                  shadow
                  transition-transform
                  ${
                    isPublished
                      ? "translate-x-[20px] sm:translate-x-[22px]"
                      : "translate-x-0.5"
                  }
                `}
              />
            </span>

            <span className="hidden sm:inline">
              {isPublished
                ? "Published"
                : "Hidden"}
            </span>
          </button>


          {/* DELETE */}

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
              remove(img._id);
            }}
            className="
              w-9
              h-9
              sm:w-10
              sm:h-10
              shrink-0
              rounded-xl
              bg-red-50
              text-red-500
              flex
              items-center
              justify-center
              hover:bg-red-500
              hover:text-white
              active:scale-95
              transition
              touch-auto
            "
            title="Delete image"
          >
            <FaTrash size={13} />
          </button>

        </div>


        {/* DRAG HELP */}

        <div
          className="
            mt-3
            pt-3
            border-t
            border-slate-100
            flex
            items-center
            gap-2
            text-[10px]
            sm:text-xs
            text-slate-400
          "
        >
          <MdDragIndicator size={15} />

          <span className="hidden sm:inline">
            Drag image to change order
          </span>

          <span className="sm:hidden">
            Hold & drag to reorder
          </span>
        </div>

      </div>

    </div>
  );
}


// ============================================================
// MAIN GALLERY ADMIN
// ============================================================

export default function GalleryAdmin() {

  const [images, setImages] = useState([]);

  const [uploading, setUploading] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [dragSaving, setDragSaving] =
    useState(false);

  const fileInputRef = useRef(null);


  // ==========================================================
  // DND SENSORS
  // ==========================================================

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


  // ==========================================================
  // IMAGE URL
  // ==========================================================

  const getImageUrl = (path) => {

    if (!path) return "";

    const base =
      import.meta.env.VITE_API_URL || "";

    return (
      base.replace(/\/$/, "") +
      "/" +
      path.replace(/^\//, "")
    );
  };


  // ==========================================================
  // FETCH GALLERY
  // ==========================================================

  const fetchData = async () => {

    try {

      const res =
        await api.get("/gallery");

      setImages(res.data || []);

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to load gallery."
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  // ==========================================================
  // UPLOAD
  // ==========================================================

  const upload = async (files) => {

    if (!files || files.length === 0) {
      return;
    }

    try {

      setUploading(true);

      const formData =
        new FormData();

      for (const file of files) {

        formData.append(
          "images",
          file
        );

      }

      await api.post(
        "/gallery",
        formData
      );

      await fetchData();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Image upload failed."
      );

    } finally {

      setUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    }
  };


  // ==========================================================
  // TOGGLE STATUS
  // ==========================================================

  const toggle = async (id) => {

    try {

      await api.put(
        `/gallery/${id}/toggle`
      );

      await fetchData();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to update image status."
      );
    }
  };


  // ==========================================================
  // DELETE
  // ==========================================================

  const remove = async (id) => {

    if (
      !window.confirm(
        "Are you sure you want to delete this image?"
      )
    ) {
      return;
    }

    try {

      await api.delete(
        `/gallery/${id}`
      );

      setImages((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to delete image."
      );
    }
  };


  // ==========================================================
  // DRAG & DROP
  // ==========================================================

  const handleDragEnd = async (event) => {

    const {
      active,
      over,
    } = event;

    if (!over) return;

    if (active.id === over.id) {
      return;
    }

    const oldIndex =
      images.findIndex(
        (item) =>
          item._id === active.id
      );

    const newIndex =
      images.findIndex(
        (item) =>
          item._id === over.id
      );

    if (
      oldIndex === -1 ||
      newIndex === -1
    ) {
      return;
    }

    const updated =
      arrayMove(
        images,
        oldIndex,
        newIndex
      );

    const reordered =
      updated.map(
        (img, index) => ({
          ...img,
          order: index,
        })
      );

    // Optimistic UI
    setImages(reordered);

    try {

      setDragSaving(true);

      await api.put(
        "/gallery/reorder",
        {
          images: reordered,
        }
      );

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to save image order."
      );

      await fetchData();

    } finally {

      setDragSaving(false);

    }
  };


  // ==========================================================
  // STATS
  // ==========================================================

  const publishedCount =
    images.filter(
      (img) =>
        img.status === "published"
    ).length;

  const hiddenCount =
    images.length -
    publishedCount;


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">

        <div className="flex flex-col items-center gap-4">

          <div
            className="
              w-10
              h-10
              sm:w-12
              sm:h-12
              border-4
              border-blue-100
              border-t-blue-600
              rounded-full
              animate-spin
            "
          />

          <p className="text-xs sm:text-sm text-slate-500">
            Loading gallery...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <div className="min-h-screen w-full bg-slate-50">

      <div
        className="
          w-full
          max-w-7xl
          mx-auto
          px-3
          sm:px-4
          md:px-6
          lg:px-8
          py-4
          sm:py-5
          lg:py-6
          pb-24
          md:pb-6
        "
      >

        {/* ====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            sm:gap-5
            mb-5
            sm:mb-6
          "
        >

          <div className="flex items-center gap-3 min-w-0">

            <div
              className="
                w-10
                h-10
                sm:w-12
                sm:h-12
                shrink-0
                rounded-xl
                sm:rounded-2xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-200
              "
            >
              <FaImages size={18} />
            </div>

            <div className="min-w-0">

              <h1
                className="
                  text-xl
                  sm:text-2xl
                  md:text-3xl
                  font-bold
                  text-slate-900
                "
              >
                Gallery Manager
              </h1>

              <p
                className="
                  text-xs
                  sm:text-sm
                  text-slate-500
                  mt-1
                  leading-5
                "
              >
                Upload, manage and reorder your
                website images.
              </p>

            </div>

          </div>


          {/* UPLOAD */}

          <label
            className="
              w-full
              sm:w-auto
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              sm:px-6
              py-3
              sm:py-3.5
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              text-sm
              font-bold
              cursor-pointer
              transition
              active:scale-[0.98]
            "
          >

            {uploading ? (

              <>
                <span
                  className="
                    w-4
                    h-4
                    border-2
                    border-white/40
                    border-t-white
                    rounded-full
                    animate-spin
                  "
                />

                Uploading...
              </>

            ) : (

              <>
                <FaCloudUploadAlt size={18} />

                Upload Images
              </>

            )}

            <input
              ref={fileInputRef}
              type="file"
              hidden
              multiple
              accept="image/*"
              disabled={uploading}
              onChange={(e) =>
                upload(e.target.files)
              }
            />

          </label>

        </div>


        {/* ====================================================
            STATS
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-3
            sm:gap-4
            mb-5
            sm:mb-6
          "
        >

          {/* TOTAL */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-4
              sm:p-5
              shadow-sm
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Total Images
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                  {images.length}
                </h2>

              </div>

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FaImages />
              </div>

            </div>

          </div>


          {/* PUBLISHED */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-4
              sm:p-5
              shadow-sm
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Published
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-1">
                  {publishedCount}
                </h2>

              </div>

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <FaCheckCircle />
              </div>

            </div>

          </div>


          {/* HIDDEN */}

          <div
            className="
              bg-white
              border
              border-slate-200
              rounded-2xl
              p-4
              sm:p-5
              shadow-sm
            "
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Hidden
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-600 mt-1">
                  {hiddenCount}
                </h2>

              </div>

              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center">
                <FaEyeSlash />
              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            UPLOAD STATUS
        ===================================================== */}

        {uploading && (

          <div
            className="
              flex
              items-center
              gap-3
              px-4
              sm:px-5
              py-3
              sm:py-4
              mb-5
              rounded-2xl
              bg-blue-50
              border
              border-blue-100
              text-blue-700
              text-xs
              sm:text-sm
              font-semibold
            "
          >

            <span
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

            Uploading your images...

          </div>

        )}


        {/* ====================================================
            DRAG SAVE STATUS
        ===================================================== */}

        {dragSaving && (

          <div
            className="
              fixed
              bottom-[82px]
              md:bottom-6
              left-1/2
              -translate-x-1/2
              md:left-auto
              md:right-6
              md:translate-x-0
              z-[60]
              flex
              items-center
              gap-3
              px-4
              sm:px-5
              py-3
              rounded-2xl
              bg-slate-900
              text-white
              shadow-2xl
              text-xs
              sm:text-sm
              font-semibold
              whitespace-nowrap
            "
          >

            <span
              className="
                w-4
                h-4
                border-2
                border-white/30
                border-t-white
                rounded-full
                animate-spin
              "
            />

            Saving order...

          </div>

        )}


        {/* ====================================================
            GALLERY
        ===================================================== */}

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-2xl
            sm:rounded-3xl
            p-3
            sm:p-5
            md:p-6
            shadow-sm
          "
        >

          {/* SECTION HEADER */}

          <div
            className="
              flex
              flex-col
              sm:flex-row
              sm:items-center
              sm:justify-between
              gap-3
              mb-5
              sm:mb-6
            "
          >

            <div>

              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                All Images
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Drag and drop images to change their order.
              </p>

            </div>

            {images.length > 0 && (

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-3
                  py-2
                  rounded-xl
                  bg-slate-50
                  border
                  border-slate-200
                  text-[11px]
                  sm:text-xs
                  font-semibold
                  text-slate-600
                  w-fit
                "
              >

                <FaImages size={11} />

                {images.length}{" "}

                {images.length === 1
                  ? "Image"
                  : "Images"}

              </div>

            )}

          </div>


          {/* MOBILE DRAG INSTRUCTION */}

          {images.length > 1 && (

            <div
              className="
                md:hidden
                flex
                items-start
                gap-2
                px-3
                py-2.5
                mb-4
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

              <p className="text-[11px] leading-5">
                Press and hold an image, then drag
                it up, down, left or right to change
                its order.
              </p>

            </div>

          )}


          {/* EMPTY STATE */}

          {images.length === 0 ? (

            <div
              className="
                min-h-[300px]
                sm:min-h-[360px]
                border-2
                border-dashed
                border-slate-200
                rounded-2xl
                sm:rounded-3xl
                flex
                flex-col
                items-center
                justify-center
                text-center
                px-5
              "
            >

              <div
                className="
                  w-16
                  h-16
                  sm:w-20
                  sm:h-20
                  rounded-3xl
                  bg-blue-50
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <FaCloudUploadAlt size={28} />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-slate-800">
                No images yet
              </h3>

              <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-2 leading-5">
                Upload your first gallery images to
                get started. You can reorder them
                anytime using drag and drop.
              </p>

              <label
                className="
                  mt-5
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  sm:w-auto
                  px-5
                  py-3
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-semibold
                  cursor-pointer
                  transition
                "
              >

                <FaCloudUploadAlt />

                Upload Images

                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    upload(e.target.files)
                  }
                />

              </label>

            </div>

          ) : (

            /* =================================================
               DND
            ================================================== */

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >

              <SortableContext
                items={images.map(
                  (image) => image._id
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

                  {images.map((img) => (

                    <SortableImage
                      key={img._id}
                      img={img}
                      imageUrl={getImageUrl(
                        img.image
                      )}
                      toggle={toggle}
                      remove={remove}
                    />

                  ))}

                </div>

              </SortableContext>

            </DndContext>

          )}

        </div>

      </div>

    </div>
  );
}